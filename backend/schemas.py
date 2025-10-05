from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
import datetime

class AgentUpload(BaseModel):
    """Request to upload a new agent from GitHub"""
    name: str = Field(..., example="weather-bot") # type: ignore
    description: Optional[str] = Field(None, example="Gets weather information") # type: ignore
    repo_url: str = Field(..., example="https://github.com/username/weather-agent.git") # type: ignore
    developer_secrets: Optional[Dict[str, str]] = Field(None, example={"OPENAI_API_KEY": "sk-xxx"}) # type: ignore


class AgentResponse(BaseModel):
    """Agent information returned to clients"""
    id: int
    name: str
    description: Optional[str]
    repo_url: str
    created_at: datetime.datetime

    class Config:
        orm_mode = True

class DeploymentCreate(BaseModel):
    """Request to deploy an agent"""
    user_secrets: Optional[Dict[str, str]] = Field(None, example={"USER_API_KEY": "abc123"}) # type: ignore


class DeploymentResponse(BaseModel):
    """Response when deploying an agent"""
    id: int
    agent_id: int
    api_key: str
    status: str
    created_at: datetime.datetime
    agent: AgentResponse

    class Config:
        orm_mode = True

class DeploymentListResponse(BaseModel):
    """Simplified deployment info for listing"""
    id: int
    agent_id: int
    agent_name: str
    api_key: str
    status: str
    created_at: datetime.datetime

class ExecuteRequest(BaseModel):
    """Request to execute an agent"""
    input_data: Dict[str, Any] = Field(..., example={"message": "Hello, agent!"}) # type: ignore


class ExecuteResponse(BaseModel):
    """Response from agent execution"""
    success: bool
    output: Dict[str, Any]
    error: Optional[str] = None

class AgentSearchResponse(BaseModel):
    """Response for agent search with similarity score"""
    agent: AgentResponse
    similarity_score: float = Field(..., description="Similarity score (0-1, higher is better)")

    class Config:
        orm_mode = True