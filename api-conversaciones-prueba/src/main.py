from fastapi import FastAPI
from src.routes.conversations import router as conversations_router
from dotenv import load_dotenv
from src.routes.users import router as user_router

load_dotenv()  # ensures environment is loaded early

app = FastAPI()
app.include_router(conversations_router)
app.include_router(user_router)
