import numpy as np
import pickle
from sentence_transformers import SentenceTransformer
from typing import List, Tuple


class EmbeddingService:
    """Handles embedding generation and similarity search"""
    
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        """
        Initialize the embedding model
        
        Args:
            model_name: Name of the sentence-transformers model
                       "all-MiniLM-L6-v2" is fast and good for general use
                       Downloads ~80MB on first use
        """
        print(f"Loading embedding model: {model_name}")
        self.model = SentenceTransformer(model_name)
        print("Embedding model loaded successfully")
    
    def generate_embedding(self, text: str) -> bytes:
        """
        Generate embedding for a text
        
        Args:
            text: Text to embed (agent name + description)
            
        Returns:
            bytes: Serialized numpy array (for database storage)
        """
        embedding = self.model.encode(text, convert_to_numpy=True)
        
        return pickle.dumps(embedding)
    
    def deserialize_embedding(self, embedding_bytes: bytes) -> np.ndarray:
        """
        Deserialize embedding from database
        
        Args:
            embedding_bytes: Serialized embedding from database
            
        Returns:
            np.ndarray: Embedding vector
        """
        return pickle.loads(embedding_bytes)
    
    def compute_similarity(self, embedding1: np.ndarray, embedding2: np.ndarray) -> float:
        """
        Compute cosine similarity between two embeddings
        
        Args:
            embedding1: First embedding vector
            embedding2: Second embedding vector
            
        Returns:
            float: Similarity score (0-1, higher is more similar)
        """
        similarity = np.dot(embedding1, embedding2) / (
            np.linalg.norm(embedding1) * np.linalg.norm(embedding2)
        )
        return float(similarity)
    
    def find_most_similar(
        self, 
        query_embedding: np.ndarray, 
        agent_embeddings: List[Tuple[int, bytes]], 
        top_k: int = 5
    ) -> List[Tuple[int, float]]:
        """
        Find most similar agents to a query
        
        Args:
            query_embedding: Query embedding vector
            agent_embeddings: List of (agent_id, embedding_bytes) tuples
            top_k: Number of top matches to return
            
        Returns:
            List of (agent_id, similarity_score) sorted by similarity (highest first)
        """
        similarities = []
        
        for agent_id, embedding_bytes in agent_embeddings:
            if embedding_bytes is None:
                continue
            
            agent_embedding = self.deserialize_embedding(embedding_bytes)
            
            similarity = self.compute_similarity(query_embedding, agent_embedding)
            similarities.append((agent_id, similarity))
        
        # Sort by similarity (highest first) and return top K
        similarities.sort(key=lambda x: x[1], reverse=True)
        return similarities[:top_k]


# Singleton instance
embedding_service = EmbeddingService()