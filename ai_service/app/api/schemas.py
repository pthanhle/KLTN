from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ChatRequest(BaseModel):
    user_id: str
    message: str
    conversation_id: Optional[str] = None

class MessageDetail(BaseModel):
    id: str         
    role: str
    content: str
    timestamp: datetime

class ConversationDetail(BaseModel):
    id: str
    title: str
    updated_at: datetime
    created_at: datetime

class ChatResponse(BaseModel):
    success: bool
    answer: str
    conversation_id: str
    title: str

class ConversationsListResponse(BaseModel):
    success: bool
    conversations: List[ConversationDetail]

class MessagesListResponse(BaseModel):
    success: bool
    messages: List[MessageDetail]

class GenericResponse(BaseModel):
    success: bool
