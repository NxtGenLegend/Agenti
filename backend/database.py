from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import datetime

from .config import DATABASE_URL

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class Agent(Base):
    """
    An agent uploaded by a developer and available in the marketplace.
    """
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(Text, nullable=True)
    repo_url = Column(String, nullable=False)
    code_path = Column(String, nullable=False)  # Local path to cloned repo
    developer_secrets = Column(JSON, nullable=True)  # API keys set by developer
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    deployments = relationship("Deployment", back_populates="agent", cascade="all, delete-orphan")


class Deployment(Base):
    """
    A user's deployment of an agent. Each deployment gets a unique API key.
    """
    __tablename__ = "deployments"

    id = Column(Integer, primary_key=True, index=True)
    agent_id = Column(Integer, ForeignKey("agents.id"), nullable=False)
    api_key = Column(String, unique=True, nullable=False, index=True)
    user_secrets = Column(JSON, nullable=True)  # API keys set by user
    status = Column(String, default="active")  # active, stopped
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    agent = relationship("Agent", back_populates="deployments")


def create_db_and_tables():
    """
    Creates the database and tables if they don't exist.
    """
    Base.metadata.create_all(bind=engine)