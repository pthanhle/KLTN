from fastapi import APIRouter, HTTPException
from app.services.ai_engine import (
    generate_response, 
    get_user_conversations, 
    get_conversation_messages, 
    delete_conversation
)
from .schemas import (
    ChatRequest, 
    ChatResponse, 
    ConversationsListResponse, 
    MessagesListResponse, 
    GenericResponse
)

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        result = await generate_response(request.user_id, request.message, request.conversation_id)
        return {"success": True, **result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/conversations/{user_id}", response_model=ConversationsListResponse)
async def fetch_conversations(user_id: str):
    try:
        conversations = await get_user_conversations(user_id)
        return {"success": True, "conversations": conversations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/conversations/{conversation_id}/messages", response_model=MessagesListResponse)
async def fetch_messages(conversation_id: str, user_id: str):
    try:
        messages = await get_conversation_messages(user_id, conversation_id)
        return {"success": True, "messages": messages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/conversations/{conversation_id}", response_model=GenericResponse)
async def remove_conversation(conversation_id: str, user_id: str):
    try:
        success = await delete_conversation(user_id, conversation_id)
        return {"success": success}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def health_check():
    return {"status": "ok"}
