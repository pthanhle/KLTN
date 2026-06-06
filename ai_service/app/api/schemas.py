from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class BookingDraft(BaseModel):
    service_type: Optional[str] = None
    booking_date: Optional[str] = None
    time_slot: Optional[str] = None
    vehicle_brand: Optional[str] = None
    vehicle_model: Optional[str] = None
    vehicle_license_plate: Optional[str] = None
    notes: Optional[str] = None
    is_complete: bool = False
    missing_info: List[str] = []


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
    booking_draft: Optional[BookingDraft] = None


class ConversationsListResponse(BaseModel):
    success: bool
    conversations: List[ConversationDetail]


class MessagesListResponse(BaseModel):
    success: bool
    messages: List[MessageDetail]


class GenericResponse(BaseModel):
    success: bool
