from fastapi import FastAPI
from src.routes.conversations import router as conversations_router
from dotenv import load_dotenv

load_dotenv()  # ensures environment is loaded early

app = FastAPI()
app.include_router(conversations_router)
