from fastapi import APIRouter, HTTPException
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

@router.get("/conversations/{conversation_id}", response_model=Conversation)
async def get_conversation_by_id(conversation_id: str):
    conversation = await conversation_collection.find_one({"id": conversation_id})
    if not conversation:
        raise HTTPException(
            status_code=404,
            detail=f"Conversation with the id {conversation_id} was not found"
        )
    conversation["_id"] = str(conversation["_id"])
    return conversation