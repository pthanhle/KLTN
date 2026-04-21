from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.api.ai_route import router as ai_router
from app.core.database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(title="CarsShop AI Service", lifespan=lifespan)

app.include_router(ai_router, prefix="/ai")
