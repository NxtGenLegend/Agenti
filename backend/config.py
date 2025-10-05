import os

APP_NAME = "Agenti"
APP_VERSION = "0.1.0"
APP_DESCRIPTION = "AI Agent Marketplace - Deploy and use AI agents via API"
AGENTS_STORAGE_DIR = os.path.join(os.getcwd(), "agents_storage")

DATABASE_URL = "sqlite:///./agenti.db"

HOST = "0.0.0.0"
PORT = 8000

REQUIRED_AGENT_FUNCTION = "process_request"
AGENT_ENTRY_FILE = "main.py"