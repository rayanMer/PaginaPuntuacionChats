from pydantic import BaseModel, Field
from typing import Optional, List, Any

# Message schema
class Message(BaseModel):
    role: str
    content: str

# Metrics schema
class Metrics(BaseModel):
    metric_1: Optional[int]
    metric_2: Optional[int]
    metric_3: Optional[int]
    metric_4: Optional[int]

# Conversation schema
class Conversation(BaseModel):
    id: Optional[str]
    mongo_id: Optional[str] = Field(None, alias="_id")
    messages: List[Message]
    metrics: Optional[Metrics] = None
    doctorEmail: str

    class Config:
        allow_population_by_field_name = True
        by_alias = False

# User schema
class User(BaseModel):
    email: str
    password: str

# Schema for the update conversations
class UpdateConversation(BaseModel):
    messages: Optional[List[Message]] = None
    metrics: Optional[Metrics] = None
    doctorEmail: Optional[str] = None
    id: Optional[str] = None

    class Config:
        extra = "forbid"