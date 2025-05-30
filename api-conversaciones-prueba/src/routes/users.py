from fastapi import APIRouter, HTTPException
from src.database import user_collection
from src.models import User

router = APIRouter()

@router.get("/users/{email}", response_model=User)
async def get_user_by_email(email: str):
    user = await user_collection.find_one({"email": email})
    if user is None:
        raise HTTPException(status_code=404, detail=f"User with email {email} not found")
    user["password"] = user.get("password", "")
    return User(**user)
