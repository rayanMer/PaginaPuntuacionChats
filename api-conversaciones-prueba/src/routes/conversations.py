from fastapi import APIRouter
from typing import List
from src.database import conversation_collection
from src.models import Conversation

router = APIRouter()

@router.get("/conversations", response_model=List[Conversation])
async def get_all_conversations():
    conversations = []
    async for conversation in conversation_collection.find():
        conversation["_id"] = str(conversation["_id"])
        conversations.append(conversation)
    return conversations

