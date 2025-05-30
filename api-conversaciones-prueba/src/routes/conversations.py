from fastapi import APIRouter, HTTPException, Path
from typing import List
from src.database import conversation_collection
from src.models import Conversation, UpdateConversation

router = APIRouter()

# GET ALL
@router.get("/conversations", response_model=List[Conversation])
async def get_all_conversations():
    conversations = []
    async for conversation in conversation_collection.find():
        conversation["_id"] = str(conversation["_id"])
        conversations.append(conversation)
    return conversations

# GET BY ID
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

# PATCH
@router.patch("/conversations/{id}", response_model=Conversation)
async def patch_conversation(id: str, update_data: UpdateConversation):
    update_dict = update_data.model_dump(exclude_unset=True)

    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    result = await conversation_collection.find_one_and_update(
        {"id": id},
        {"$set": update_dict},
        return_document=True
    )

    if result is None:
        raise HTTPException(status_code=404, detail=f"Conversation with id {id} not found")

    result["_id"] = str(result["_id"])

    return Conversation.model_validate(result)






