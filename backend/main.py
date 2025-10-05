from fastapi import FastAPI, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List, Optional
import secrets

from . import config, schemas, database
from .agent_manager import agent_manager

database.create_db_and_tables()

app = FastAPI(
    title=config.APP_NAME,
    version=config.APP_VERSION,
    description=config.APP_DESCRIPTION
)

def get_db():
    """Database session dependency"""
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    """API information"""
    return {
        "message": f"Welcome to {config.APP_NAME}",
        "version": config.APP_VERSION,
        "endpoints": {
            "agents": {
                "POST /agents": "Upload a new agent",
                "GET /agents": "List all available agents",
                "GET /agents/{id}": "Get agent details",
                "DELETE /agents/{id}": "Delete an agent"
            },
            "deployments": {
                "POST /agents/{id}/deploy": "Deploy an agent (get API key)",
                "GET /deployments": "List all deployments",
                "DELETE /deployments/{id}": "Stop a deployment"
            },
            "execution": {
                "POST /api/execute": "Execute your deployed agent (requires X-API-Key header)"
            }
        }
    }

@app.post("/agents", response_model=schemas.AgentResponse, status_code=201)
def upload_agent(agent: schemas.AgentUpload, db: Session = Depends(get_db)):
    """
    Upload a new agent to the marketplace from a GitHub repository.
    
    The repository must contain:
    - main.py with a process_request(input_data) function
    - Optional: requirements.txt for dependencies
    
    You can optionally provide developer_secrets (API keys, credentials) that will be
    available to the agent as environment variables during execution.
    """
    existing = db.query(database.Agent).filter(database.Agent.name == agent.name).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Agent with name '{agent.name}' already exists")
    
    try:
        code_path = agent_manager.upload_agent(agent.name, agent.repo_url)
        
        db_agent = database.Agent(
            name=agent.name,
            description=agent.description,
            repo_url=agent.repo_url,
            code_path=code_path,
            developer_secrets=agent.developer_secrets or {}
        )
        db.add(db_agent)
        db.commit()
        db.refresh(db_agent)
        
        return db_agent
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/agents", response_model=List[schemas.AgentResponse])
def list_agents(db: Session = Depends(get_db)):
    """
    List all available agents in the marketplace.
    Users can browse and deploy any of these agents.
    """
    agents = db.query(database.Agent).all()
    return agents


@app.get("/agents/{agent_id}", response_model=schemas.AgentResponse)
def get_agent(agent_id: int, db: Session = Depends(get_db)):
    """Get details of a specific agent"""
    agent = db.query(database.Agent).filter(database.Agent.id == agent_id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent


@app.delete("/agents/{agent_id}")
def delete_agent(agent_id: int, db: Session = Depends(get_db)):
    """
    Delete an agent from the marketplace.
    This will also stop all deployments of this agent.
    """
    agent = db.query(database.Agent).filter(database.Agent.id == agent_id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    agent_manager.delete_agent(agent.code_path) # type: ignore
    
    db.delete(agent)
    db.commit()
    
    return {"message": f"Agent '{agent.name}' deleted successfully"}

@app.post("/agents/{agent_id}/deploy", response_model=schemas.DeploymentResponse, status_code=201)
def deploy_agent(agent_id: int, deployment: schemas.DeploymentCreate = None, db: Session = Depends(get_db)): # type: ignore
    """
    Deploy an agent and get an API key.
    
    Use this API key in the X-API-Key header when calling /api/execute
    to interact with your deployed agent.
    
    You can optionally provide user_secrets (your own API keys, credentials) that will be
    available to the agent as environment variables during execution.
    These are merged with the developer_secrets set when the agent was uploaded.
    """
    agent = db.query(database.Agent).filter(database.Agent.id == agent_id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    api_key = f"ak_{secrets.token_urlsafe(32)}"
    
    user_secrets = deployment.user_secrets if deployment else None
    
    deployment_record = database.Deployment(
        agent_id=agent_id,
        api_key=api_key,
        user_secrets=user_secrets or {},
        status="active"
    )
    db.add(deployment_record)
    db.commit()
    db.refresh(deployment_record)
    
    return deployment_record


@app.get("/deployments", response_model=List[schemas.DeploymentListResponse])
def list_deployments(db: Session = Depends(get_db)):
    """
    List all active deployments.
    Each deployment has its own API key for executing the agent.
    """
    deployments = db.query(database.Deployment).filter(
        database.Deployment.status == "active"
    ).all()
    
    result = []
    for dep in deployments:
        result.append(schemas.DeploymentListResponse(
            id=dep.id, # type: ignore
            agent_id=dep.agent_id, # type: ignore
            agent_name=dep.agent.name,
            api_key=dep.api_key, # type: ignore
            status=dep.status, # type: ignore
            created_at=dep.created_at # type: ignore
        ))
    
    return result


@app.delete("/deployments/{deployment_id}")
def stop_deployment(deployment_id: int, db: Session = Depends(get_db)):
    """
    Stop a deployment.
    The API key will no longer work after this.
    """
    deployment = db.query(database.Deployment).filter(
        database.Deployment.id == deployment_id
    ).first()
    
    if not deployment:
        raise HTTPException(status_code=404, detail="Deployment not found")
    
    deployment.status = "stopped" # type: ignore
    db.commit()
    
    return {"message": "Deployment stopped successfully"}


# ============= EXECUTION ENDPOINT (For End Users) =============

@app.post("/api/execute", response_model=schemas.ExecuteResponse)
def execute_agent(
    request: schemas.ExecuteRequest,
    x_api_key: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """
    Execute your deployed agent with input data.
    
    Required header:
    - X-API-Key: Your deployment API key
    
    The agent's process_request() function will be called with your input_data.
    
    Secrets handling:
    - Developer secrets (set when agent was uploaded) are passed as environment variables
    - User secrets (set when you deployed) are also passed as environment variables
    - User secrets override developer secrets if there's a conflict
    """
    if not x_api_key:
        raise HTTPException(
            status_code=401,
            detail="Missing X-API-Key header"
        )
    
    # Find deployment by API key
    deployment = db.query(database.Deployment).filter(
        database.Deployment.api_key == x_api_key,
        database.Deployment.status == "active"
    ).first()
    
    if not deployment:
        raise HTTPException(
            status_code=401,
            detail="Invalid or inactive API key"
        )
    
    # Get the agent
    agent = deployment.agent
    
    try:
        # Merge secrets: developer_secrets + user_secrets (user secrets override)
        all_secrets = {}
        if agent.developer_secrets:
            all_secrets.update(agent.developer_secrets)
        if deployment.user_secrets: # type: ignore
            all_secrets.update(deployment.user_secrets) # type: ignore
        
        # Execute the agent with merged secrets
        output = agent_manager.execute_agent(
            agent.code_path, 
            request.input_data,
            all_secrets if all_secrets else None
        )
        
        return schemas.ExecuteResponse(
            success=True,
            output=output
        )
        
    except Exception as e:
        return schemas.ExecuteResponse(
            success=False,
            output={},
            error=str(e)
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=config.HOST, port=config.PORT)