"""
Agent Manager - Handles uploading, validating, and executing agents
"""
import os
import shutil
import subprocess
import sys
import importlib.util
from pathlib import Path
from typing import Dict, Any, Optional
import git

from .config import AGENTS_STORAGE_DIR, REQUIRED_AGENT_FUNCTION, AGENT_ENTRY_FILE


class AgentManager:
    """Manages agent lifecycle: upload, validate, execute"""
    
    def __init__(self):
        self.storage_dir = Path(AGENTS_STORAGE_DIR)
        self.storage_dir.mkdir(exist_ok=True)
    
    def upload_agent(self, name: str, repo_url: str) -> str:
        """
        Clone agent from GitHub and validate it
        
        Returns:
            str: Local path to the cloned agent
        """
        agent_path = self.storage_dir / name
        
        if agent_path.exists():
            shutil.rmtree(agent_path)
        
        try:
            print(f"Cloning {repo_url} to {agent_path}")
            git.Repo.clone_from(repo_url, agent_path)
            
            self._validate_agent(agent_path)
            
            requirements_file = agent_path / "requirements.txt"
            if requirements_file.exists():
                print(f"Installing dependencies for {name}")
                subprocess.run(
                    [sys.executable, "-m", "pip", "install", "-r", str(requirements_file)],
                    check=True,
                    capture_output=True
                )
            
            return str(agent_path)
            
        except git.GitCommandError as e:
            raise Exception(f"Failed to clone repository: {str(e)}")
        except Exception as e:
            if agent_path.exists():
                shutil.rmtree(agent_path)
            raise
    
    def _validate_agent(self, agent_path: Path):
        """
        Validate that the agent has the required structure
        
        Raises:
            Exception: If validation fails
        """
        main_file = agent_path / AGENT_ENTRY_FILE
        
        if not main_file.exists():
            raise Exception(f"Agent must have a {AGENT_ENTRY_FILE} file")
        
        try:
            spec = importlib.util.spec_from_file_location("agent_module", main_file)
            module = importlib.util.module_from_spec(spec) # type: ignore
            spec.loader.exec_module(module) # type: ignore
            
            if not hasattr(module, REQUIRED_AGENT_FUNCTION):
                raise Exception(
                    f"Agent's {AGENT_ENTRY_FILE} must have a '{REQUIRED_AGENT_FUNCTION}(input_data)' function"
                )
            
            if not callable(getattr(module, REQUIRED_AGENT_FUNCTION)):
                raise Exception(f"'{REQUIRED_AGENT_FUNCTION}' must be a function")
                
        except Exception as e:
            if "must have a" in str(e):
                raise
            raise Exception(f"Failed to validate agent: {str(e)}")
    
    def execute_agent(self, agent_path: str, input_data: Dict[str, Any], secrets: Optional[Dict[str, str]] = None) -> Dict[str, Any]:
        """
        Execute an agent with the given input
        
        Args:
            agent_path: Path to the agent's code
            input_data: Input to pass to the agent
            secrets: API keys and secrets to pass as environment variables
            
        Returns:
            Dict: Agent's output
        """
        try:
            main_file = Path(agent_path) / AGENT_ENTRY_FILE
            
            original_env = {}
            if secrets:
                for key, value in secrets.items():
                    original_env[key] = os.environ.get(key)
                    os.environ[key] = value
            
            try:
                spec = importlib.util.spec_from_file_location("agent_module", main_file)
                module = importlib.util.module_from_spec(spec) # type: ignore
                
                agent_dir = str(Path(agent_path))
                if agent_dir not in sys.path:
                    sys.path.insert(0, agent_dir)
                
                try:
                    spec.loader.exec_module(module) # type: ignore
                    
                    process_func = getattr(module, REQUIRED_AGENT_FUNCTION)
                    result = process_func(input_data)
                    
                    if not isinstance(result, dict):
                        result = {"result": result}
                    
                    return result
                    
                finally:
                    if agent_dir in sys.path:
                        sys.path.remove(agent_dir)
            
            finally:
                if secrets:
                    for key in secrets.keys():
                        if original_env[key] is None:
                            os.environ.pop(key, None)
                        else:
                            os.environ[key] = original_env[key]
            
        except Exception as e:
            raise Exception(f"Agent execution failed: {str(e)}")
    
    def delete_agent(self, agent_path: str):
        """Delete an agent's code"""
        path = Path(agent_path)
        if path.exists():
            shutil.rmtree(path)

agent_manager = AgentManager()