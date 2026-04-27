import asyncio
import time
import redis.asyncio as redis
from collections import deque
from datetime import datetime
from bson import ObjectId


from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage, AIMessage

from app.core.config import settings
from app.core.database import db

llm = ChatGoogleGenerativeAI(
    model=settings.MODEL_NAME,
    google_api_key=settings.GEMINI_API_KEY,
    temperature=0.7,
    convert_system_message_to_human=True,
)

redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)

_request_times: deque = deque()
_RATE_LIMIT = 12
_RATE_WINDOW = 60.0


GREETING_KEYWORDS = {
    "xin chào", "xin chao", "chào", "chao", "hello", "hi", "hey",
    "helo", "alo", "ơi", "bạn ơi", "cho hỏi", "giúp mình", "giúp tôi",
}


SYSTEM_GREETING = (
    "Bạn là trợ lý ảo thân thiện của CarsShop. "
    "Hãy chào hỏi lịch sự và hỏi bạn cần hỗ trợ gì về xe hơi hoặc dịch vụ tại shop. "
    "Trả lời ngắn gọn, tự nhiên, không dùng ký hiệu Markdown."
)


SYSTEM_TEMPLATE = (
    "Bạn là trợ lý ảo chuyên nghiệp của CarsShop. CHỈ trả lời dựa trên dữ liệu thật sau đây:\n"
    "{context}\n\n"
    "QUY TẮC:\n"
    "1. KHÔNG ĐƯỢC nhắc đến bất kỳ mẫu xe nào KHÔNG CÓ trong danh sách trên.\n"
    "2. Nếu danh sách trống hoặc không có xe đúng yêu cầu, trả lời: 'Hiện tại hệ thống chưa tìm thấy xe nào phù hợp với yêu cầu này tại shop. Bạn vui lòng để lại thông tin hoặc yêu cầu khác để em tìm kiếm thêm nhé!'\n"
    "3. Tuyệt đối không dùng kiến thức bên ngoài về các dòng xe không có trong dữ liệu.\n"
    "4. Trả lời ngắn gọn, thân thiện, không dùng ký hiệu Markdown."
)


QUOTA_EXCEEDED_MSG = (
    "Hiện tại hệ thống AI đang bận, vui lòng thử lại sau ít phút. "
    "Bạn có thể để lại thông tin liên hệ để chúng tôi hỗ trợ trực tiếp."
)


PERSONAL_KEYWORDS = {
    "tôi", "của tôi", "mình", "của mình", "đơn hàng", "order", "tài khoản",
    "account", "mật khẩu", "password", "tên", "name", "địa chỉ", "address",
    "phone", "sdt", "số điện thoại", "giỏ hàng", "cart", "thanh toán", "payment"
}


def _is_greeting(message: str) -> bool:
    msg = message.lower().strip()
    if len(msg.split()) <= 4:
        for kw in GREETING_KEYWORDS:
            if kw in msg:
                return True
    return False


def _extract_price(message: str) -> dict | None:
    import re
    msg = message.lower()

    match_billion = re.search(r"(\d+[\.,]?\d*)\s*tỷ", msg)
    match_million = re.search(r"(\d+[\.,]?\d*)\s*(triệu|tr)", msg)

    asked_price = None
    if match_billion:
        asked_price = float(match_billion.group(1).replace(",", ".")) * 1_000_000_000
    elif match_million:
        asked_price = float(match_million.group(1).replace(",", ".")) * 1_000_000

    if not asked_price:
        return None

    if any(x in msg for x in ["dưới", "thấp hơn", "ít hơn", "nhỏ hơn", "tối đa", "không quá", "<"]):
        return {"price": {"$lte": asked_price}}
    if any(x in msg for x in ["trên", "hơn", "cao hơn", "nhiều hơn", "tối thiểu", "ít nhất", ">"]):
        return {"price": {"$gte": asked_price}}

    return {"price": {"$gte": asked_price * 0.8, "$lte": asked_price * 1.2}}


def _is_personal_query(message: str) -> bool:
    msg = message.lower()
    return any(kw in msg for kw in PERSONAL_KEYWORDS)


def _normalize_key(message: str, user_id: str = None) -> str:
    normalized = " ".join(message.lower().split())
    if user_id:
        return f"private:{user_id}:{normalized}"
    return f"public:{normalized}"


async def _wait_for_rate_limit() -> None:
    now = time.monotonic()
    while _request_times and now - _request_times[0] > _RATE_WINDOW:
        _request_times.popleft()
    if len(_request_times) >= _RATE_LIMIT:
        wait_time = _RATE_WINDOW - (now - _request_times[0]) + 0.1
        await asyncio.sleep(wait_time)
        now = time.monotonic()
        while _request_times and now - _request_times[0] > _RATE_WINDOW:
            _request_times.popleft()
    _request_times.append(time.monotonic())


async def _invoke_with_backoff(messages: list) -> str:
    max_retries = 3
    delay = 10.0
    for attempt in range(max_retries):
        try:
            result = await llm.ainvoke(messages)
            return result.content.replace("**", "").replace("*", "-").strip()
        except Exception as e:
            err = str(e).lower()
            if "429" in err or "resource_exhausted" in err or "quota" in err:
                if attempt < max_retries - 1:
                    await asyncio.sleep(delay)
                    delay *= 2
                else:
                    raise RuntimeError("quota_exceeded")
            else:
                raise


async def _rephrase_answer(raw_answer: str, user_query: str) -> str:
    prompt = (
        f"Hãy diễn đạt lại câu trả lời sau đây một cách tự nhiên và mới mẻ hơn để phản hồi cho câu hỏi: '{user_query}'.\n"
        "YÊU CẦU:\n"
        "1. Giữ nguyên toàn bộ thông tin quan trọng (giá, tên xe, thông số).\n"
        "2. Ngắn gọn, thân thiện, không dùng Markdown.\n"
        f"CÂU TRẢ LỜI GỐC: {raw_answer}"
    )
    try:
        result = await llm.ainvoke([HumanMessage(content=prompt)])
        return result.content.replace("**", "").replace("*", "-").strip()
    except:
        return raw_answer


async def _generate_ai_title(first_msg: str) -> str:
    prompt = (
        "Dựa trên tin nhắn đầu tiên của khách hàng sau đây, hãy đặt một tiêu đề cực kỳ ngắn gọn (dưới 5 từ) "
        "để đặt tên cho cuộc hội thoại này. Chỉ trả về tiêu đề, không thêm gì khác.\n"
        f"TIN NHẮN: {first_msg}"
    )
    try:
        result = await llm.ainvoke([HumanMessage(content=prompt)])
        return result.content.replace('"', '').replace('.', '').strip()
    except:
        return first_msg[:30] + "..."


async def _fetch_context(message: str) -> str:
    import re
    msg_low = message.lower()
    price_filter = _extract_price(message)

    clean_msg = re.sub(r"(\d+[\.,]?\d*)\s*(tỷ|triệu|tr)", "", msg_low)
    clean_msg = re.sub(r"tầm giá|khoảng|dưới|trên|giá|hơn|thấp hơn|cao hơn", "", clean_msg).strip()
    if clean_msg in ["xe", "ô tô", "oto", "chiếc", "option", "lựa chọn", "mẫu"]:
        clean_msg = ""

    phrase_regex = {"$regex": re.escape(clean_msg), "$options": "i"} if clean_msg else None
    cars, parts, services = await _query_all(phrase_regex, price_filter)

    if not cars and price_filter:
        cars, _, _ = await _query_all(None, price_filter)

    is_asking_generic = any(x in msg_low for x in ["option nào", "lựa chọn nào", "có gì", "xe gì", "còn gì", "liệt kê", "danh sách"])
    if not cars or is_asking_generic:
        if not cars or is_asking_generic:
            cars = await db.cars.find({}).sort("price", 1).limit(5).to_list(5)

    if not any([cars, parts, services]) and clean_msg:
        words = [w for w in clean_msg.split() if len(w) > 2]
        if words:
            word_regex = {"$regex": "|".join(re.escape(w) for w in words), "$options": "i"}
            cars, parts, services = await _query_all(word_regex, price_filter)

    segments = []
    if cars:
        segments.append("Xe tại shop: " + " | ".join(f"{c['name']} ({c.get('year', 'N/A')}) - {c.get('price', 0):,.0f} VND" for c in cars))
    if parts:
        segments.append("Phụ tùng tại shop: " + " | ".join(f"{p['name']} - {p.get('price', 0):,.0f} VND" for p in parts))
    if services:
        segments.append("Dịch vụ tại shop: " + " | ".join(f"{s['service_name']} - {s.get('price', 0):,.0f} VND" for s in services))

    return "\n".join(segments)[:1200] if segments else ""


async def _query_all(keyword_regex: dict | None, price_filter: dict | None = None) -> tuple:
    car_query = {}
    if keyword_regex:
        car_query = {"$or": [{"name": keyword_regex}, {"brandName": keyword_regex}, {"bodyStyle": keyword_regex}]}

    if price_filter:
        if car_query:
            car_query = {"$and": [car_query, price_filter]}
        else:
            car_query = price_filter

    cars = await db.cars.find(car_query).limit(5).to_list(5)

    parts = []
    services = []
    if keyword_regex:
        parts = await db.parts.find({"$or": [{"name": keyword_regex}, {"category": keyword_regex}]}).limit(3).to_list(3)
        services = await db.servicepackages.find({"$or": [{"service_name": keyword_regex}, {"description": keyword_regex}]}).limit(3).to_list(3)

    return cars, parts, services


async def get_user_conversations(user_id: str) -> list:
    cursor = db.conversations.find({"user_id": ObjectId(user_id)}).sort("updated_at", -1)
    docs = await cursor.to_list(length=20)
    for d in docs:
        d["id"] = str(d["_id"])
        del d["_id"]
    return docs


async def _get_or_create_conversation(user_id: str, conversation_id: str = None, first_msg: str = "") -> tuple[str, str]:
    if conversation_id:
        try:
            conv = await db.conversations.find_one({"_id": ObjectId(conversation_id), "user_id": ObjectId(user_id)})
            if conv:
                return str(conv["_id"]), conv["title"]
        except:
            pass

    title = await _generate_ai_title(first_msg) if first_msg else "Cuộc trò chuyện mới"
    new_conv = {
        "user_id": ObjectId(user_id),
        "title": title,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    result = await db.conversations.insert_one(new_conv)
    return str(result.inserted_id), title


async def _get_history(conversation_id: str, limit: int = 5) -> list:
    cursor = db.chathistories.find({"conversation_id": ObjectId(conversation_id)}).sort("timestamp", -1).limit(limit)
    docs = await cursor.to_list(length=limit)
    return docs[::-1]


async def get_conversation_messages(user_id: str, conversation_id: str) -> list:
    obj_id = ObjectId(conversation_id)
    conv = await db.conversations.find_one({"_id": obj_id, "user_id": ObjectId(user_id)})
    if not conv:
        return []

    cursor = db.chathistories.find({"conversation_id": obj_id}).sort("timestamp", 1)
    docs = await cursor.to_list(length=100)
    for d in docs:
        d["id"] = str(d["_id"])
        del d["_id"]
        d["conversation_id"] = str(d["conversation_id"])
    return docs


async def delete_conversation(user_id: str, conversation_id: str) -> bool:
    obj_id = ObjectId(conversation_id)
    res_conv = await db.conversations.delete_one({"_id": obj_id, "user_id": ObjectId(user_id)})
    if res_conv.deleted_count > 0:
        await db.chathistories.delete_many({"conversation_id": obj_id})
        return True
    return False


async def _save_message(user_id: str, conversation_id: str, role: str, content: str) -> None:
    await db.chathistories.insert_one({
        "conversation_id": ObjectId(conversation_id),
        "role": role,
        "content": content,
        "timestamp": datetime.utcnow(),
    })
    await db.conversations.update_one(
        {"_id": ObjectId(conversation_id)},
        {"$set": {"updated_at": datetime.utcnow()}}
    )


def _build_messages(system: str, history: list, user_message: str) -> list:
    pairs: list[tuple[str, str]] = []
    for h in history:
        role = "user" if h["role"] == "user" else "assistant"
        pairs.append((role, h["content"]))

    sanitised: list[tuple[str, str]] = []
    expected = "user"
    for role, content in reversed(pairs):
        needed = "user" if expected == "assistant" else "assistant"
        if role == expected:
            sanitised.append((role, content))
            expected = needed

    sanitised.reverse()

    messages: list = []

    if sanitised:
        first_role, first_content = sanitised[0]
        if first_role == "user":
            messages.append(HumanMessage(content=f"{system}\n\n{first_content}"))
        else:
            messages.append(HumanMessage(content=system))
            messages.append(AIMessage(content=first_content))
        for role, content in sanitised[1:]:
            cls = HumanMessage if role == "user" else AIMessage
            messages.append(cls(content=content))
    else:
        messages.append(HumanMessage(content=system))

    messages.append(HumanMessage(content=user_message))
    return messages


async def generate_response(user_id: str, message: str, conversation_id: str = None) -> dict:
    conv_id, title = await _get_or_create_conversation(user_id, conversation_id, message)

    is_private = _is_personal_query(message)
    cache_key = _normalize_key(message, user_id if is_private else None)

    cached = await redis_client.get(cache_key)
    if cached:
        answer = await _rephrase_answer(cached, message)
        await _save_message(user_id, conv_id, "user", message)
        await _save_message(user_id, conv_id, "assistant", answer)
        return {"answer": answer, "conversation_id": conv_id, "title": title}

    await _wait_for_rate_limit()

    history = await _get_history(conv_id)

    if _is_greeting(message):
        system_prompt = SYSTEM_GREETING
    else:
        context = await _fetch_context(message)
        system_prompt = SYSTEM_TEMPLATE.format(context=context)

    messages = _build_messages(system_prompt, history, message)

    try:
        answer = await _invoke_with_backoff(messages)
    except RuntimeError as e:
        if str(e) == "quota_exceeded":
            return {"answer": QUOTA_EXCEEDED_MSG, "conversation_id": conv_id, "title": title}
        raise

    await _save_message(user_id, conv_id, "user", message)
    await _save_message(user_id, conv_id, "assistant", answer)

    await redis_client.setex(cache_key, 3600, answer)

    return {"answer": answer, "conversation_id": conv_id, "title": title}
