from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client = AsyncIOMotorClient(settings.MONGO_URI)
db = client[settings.DATABASE_NAME]

async def get_database():
    return db

async def init_db():
    try:
        await db.chathistories.create_index("timestamp", expireAfterSeconds=604800)
    except:
        await db.chathistories.drop_index("timestamp_1")
        await db.chathistories.create_index("timestamp", expireAfterSeconds=604800)
