from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_engine import generate_response

router = APIRouter()

class ChatRequest(BaseModel):
    user_id: str
    message: str

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        answer = await generate_response(request.user_id, request.message)
        return {"success": True, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    return {"status": "ok"}
