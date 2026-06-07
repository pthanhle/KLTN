import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    MONGO_URI = os.getenv("MONGO_URI")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    DATABASE_NAME = "carShop"
    MODEL_NAME = "gemini-2.0-flash"
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

settings = Settings()
