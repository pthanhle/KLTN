from datetime import datetime
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage, SystemMessage, AIMessage
from app.core.config import settings
from app.core.database import db

llm = ChatGoogleGenerativeAI(
    model=settings.MODEL_NAME,
    google_api_key=settings.GEMINI_API_KEY,
    temperature=0.7,
    convert_system_message_to_human=True
)

_cache: dict[str, str] = {}

SYSTEM_TEMPLATE = (
    "Bạn là trợ lý ảo chuyên nghiệp của CarsShop - showroom xe hơi hạng sang.\n"
    "Dữ liệu thực tế từ hệ thống:\n{context}\n\n"
    "Quy tắc:\n"
    "- Ưu tiên dữ liệu trên để trả lời chính xác.\n"
    "- Nếu không có dữ liệu phù hợp, lịch sự đề nghị khách để lại thông tin liên hệ.\n"
    "- Trả lời ngắn gọn, thân thiện, không dùng ký hiệu Markdown."
)


async def _fetch_context(message: str) -> str:
    phrase_regex = {"$regex": message.strip(), "$options": "i"}

    cars, parts, services = await _query_all(phrase_regex)

    if not any([cars, parts, services]):
        words = [w for w in message.split() if len(w) > 2]
        if words:
            word_regex = {"$regex": "|".join(words), "$options": "i"}
            cars, parts, services = await _query_all(word_regex)

    segments = []
    if cars:
        segments.append("Xe: " + " | ".join(f"{c['name']} - {c.get('price', 'Liên hệ')} VND" for c in cars))
    if parts:
        segments.append("Phụ tùng: " + " | ".join(f"{p['name']} - {p.get('price', 'Liên hệ')} VND" for p in parts))
    if services:
        segments.append("Dịch vụ: " + " | ".join(f"{s['service_name']} - {s.get('price', 'Liên hệ')} VND" for s in services))

    return "\n".join(segments)[:600] if segments else "Không tìm thấy dữ liệu phù hợp."


async def _query_all(regex: dict) -> tuple:
    cars = await db.cars.find(
        {"$or": [{"name": regex}, {"brand": regex}, {"model": regex}]}
    ).limit(3).to_list(3)

    parts = await db.parts.find(
        {"$or": [{"name": regex}, {"category": regex}]}
    ).limit(3).to_list(3)

    services = await db.servicepackages.find(
        {"$or": [{"service_name": regex}, {"description": regex}]}
    ).limit(3).to_list(3)

    return cars, parts, services


async def _get_history(user_id: str, limit: int = 5) -> list:
    cursor = db.chathistories.find({"user_id": user_id}).sort("timestamp", -1).limit(limit)
    docs = await cursor.to_list(length=limit)
    return docs[::-1]


async def _save_message(user_id: str, role: str, content: str) -> None:
    await db.chathistories.insert_one({
        "user_id": user_id,
        "role": role,
        "content": content,
        "timestamp": datetime.utcnow()
    })


def _build_messages(system: str, history: list, user_message: str) -> list:
    messages = [SystemMessage(content=system)]
    for h in history:
        cls = HumanMessage if h["role"] == "user" else AIMessage
        messages.append(cls(content=h["content"]))
    messages.append(HumanMessage(content=user_message))
    return messages


async def generate_response(user_id: str, message: str) -> str:
    cache_key = f"{user_id}:{message.strip().lower()}"
    if cache_key in _cache:
        return _cache[cache_key]

    history, context = await _get_history(user_id), await _fetch_context(message)
    system_prompt = SYSTEM_TEMPLATE.format(context=context)
    messages = _build_messages(system_prompt, history, message)

    result = await llm.ainvoke(messages)
    answer = result.content.replace("**", "").replace("*", "-").strip()

    await _save_message(user_id, "user", message)
    await _save_message(user_id, "assistant", answer)
    _cache[cache_key] = answer

    return answer
