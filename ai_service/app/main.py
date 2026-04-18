from fastapi import FastAPI
from .api.ai_route import router as ai_router

app = FastAPI(title="CarsShop AI Service")

app.include_router(ai_router, prefix="/ai")
