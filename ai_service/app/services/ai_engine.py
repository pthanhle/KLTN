import asyncio
import json
import re
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

BOOKING_KEYWORDS = {
    "đặt lịch", "đặt hẹn", "book lịch", "hẹn dịch vụ", "lịch dịch vụ",
    "lịch bảo dưỡng", "bảo dưỡng xe", "đặt bảo dưỡng", "muốn đặt",
    "đặt lịch sửa", "đặt lịch rửa", "đặt lịch kiểm tra",
    "lịch sửa xe", "lịch rửa xe", "đặt dịch vụ",
}

PARTS_KEYWORDS = {
    "linh kiện", "phụ tùng", "phụ kiện", "lốp xe", "lốp",
    "dầu nhớt", "dầu động cơ", "bộ lọc", "lọc gió", "lọc dầu",
    "ắc quy", "phanh", "đèn xe", "gương xe", "kính xe",
    "má phanh", "bugi", "dây curoa", "bình xăng", "nhớt xe",
}

SERVICE_KEYWORDS = {
    "dịch vụ", "bảo dưỡng", "sửa chữa", "sửa xe", "rửa xe",
    "kiểm tra xe", "chăm sóc xe", "spa xe", "thay dầu",
    "bảo trì", "kiểm định", "căn chỉnh", "cân bằng",
    "dịch vụ gì", "có dịch vụ", "dịch vụ nào", "giá dịch vụ",
}

PERSONAL_KEYWORDS = {
    "tôi", "của tôi", "mình", "của mình", "đơn hàng", "order", "tài khoản",
    "account", "mật khẩu", "password", "tên", "name", "địa chỉ", "address",
    "phone", "sdt", "số điện thoại", "giỏ hàng", "cart", "thanh toán", "payment",
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
    "1. KHÔNG ĐƯỢC nhắc đến bất kỳ mẫu xe/sản phẩm nào KHÔNG CÓ trong danh sách trên.\n"
    "2. Nếu danh sách trống hoặc không có dữ liệu đúng yêu cầu, trả lời lịch sự và gợi ý khách hàng liên hệ trực tiếp.\n"
    "3. Tuyệt đối không dùng kiến thức bên ngoài về các sản phẩm/dịch vụ không có trong dữ liệu.\n"
    "4. Trả lời ngắn gọn, thân thiện, không dùng ký hiệu Markdown."
)

BOOKING_ASK_TEMPLATE = (
    "Bạn là trợ lý ảo của CarsShop hỗ trợ đặt lịch dịch vụ xe hơi.\n"
    "Khách hàng muốn đặt lịch nhưng còn thiếu thông tin: {missing_info}.\n"
    "Hãy hỏi khách hàng một cách tự nhiên và thân thiện để lấy thông tin còn thiếu. "
    "Không liệt kê kiểu gạch đầu dòng, hỏi tự nhiên như đang trò chuyện. Không dùng Markdown."
)

BOOKING_CONFIRM_SYSTEM = (
    "Bạn là trợ lý ảo của CarsShop. Khách hàng vừa cung cấp đủ thông tin đặt lịch dịch vụ. "
    "Hãy xác nhận thông tin một cách thân thiện và thông báo phiếu xác nhận đã hiện bên dưới để khách hàng duyệt. "
    "Không dùng Markdown."
)

QUOTA_EXCEEDED_MSG = (
    "Hiện tại hệ thống AI đang bận, vui lòng thử lại sau ít phút. "
    "Bạn có thể để lại thông tin liên hệ để chúng tôi hỗ trợ trực tiếp."
)


def _is_greeting(message: str) -> bool:
    msg = message.lower().strip()
    if len(msg.split()) <= 4:
        for kw in GREETING_KEYWORDS:
            if kw in msg:
                return True
    return False


def _is_booking_intent(message: str) -> bool:
    msg = message.lower()
    return any(kw in msg for kw in BOOKING_KEYWORDS)


def _is_asking_about_parts(message: str) -> bool:
    msg = message.lower()
    return any(kw in msg for kw in PARTS_KEYWORDS)


def _is_asking_about_services(message: str) -> bool:
    msg = message.lower()
    return any(kw in msg for kw in SERVICE_KEYWORDS)


def _extract_price(message: str) -> dict | None:
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


async def _extract_booking_details(message: str) -> dict | None:
    today = datetime.now().strftime("%Y-%m-%d (%A)")
    prompt = (
        f"Hôm nay là {today}. Trích xuất thông tin đặt lịch dịch vụ xe hơi từ tin nhắn tiếng Việt sau.\n"
        f'Tin nhắn: "{message}"\n\n'
        "Khung giờ hợp lệ (chọn đúng một): 08:00-10:00, 10:00-12:00, 13:00-15:00, 15:00-17:00\n"
        "Quy tắc khung giờ: sáng/8h/9h → 08:00-10:00 | 10h/11h → 10:00-12:00 | chiều/13h/14h → 13:00-15:00 | chiều muộn/15h/16h → 15:00-17:00\n"
        "Loại dịch vụ: MAINTENANCE (bảo dưỡng định kỳ), REPAIR (sửa chữa), CAR_SPA (rửa/chăm sóc xe), INSPECTION (kiểm tra), OTHER\n\n"
        "Chỉ trả về JSON hợp lệ, không có text nào khác:\n"
        '{"service_type":"MAINTENANCE","booking_date":"YYYY-MM-DD hoặc null","time_slot":"khung giờ hoặc null",'
        '"vehicle_brand":"null nếu không đề cập","vehicle_model":"null nếu không đề cập",'
        '"vehicle_license_plate":"null nếu không đề cập","notes":"ghi chú nếu có","is_complete":true,"missing_info":[]}'
    )
    try:
        result = await llm.ainvoke([HumanMessage(content=prompt)])
        raw = result.content.strip()
        json_match = re.search(r'\{.*\}', raw, re.DOTALL)
        if json_match:
            data = json.loads(json_match.group())
            missing = []
            if not data.get("booking_date") or data.get("booking_date") == "null":
                data["booking_date"] = None
                missing.append("ngày đặt lịch")
            if not data.get("time_slot") or data.get("time_slot") == "null":
                data["time_slot"] = None
                missing.append("khung giờ mong muốn (sáng hoặc chiều)")
            if not data.get("service_type"):
                missing.append("loại dịch vụ (bảo dưỡng, sửa chữa, rửa xe...)")
            for field in ["vehicle_brand", "vehicle_model", "vehicle_license_plate"]:
                if data.get(field) == "null":
                    data[field] = None
            data["is_complete"] = len(missing) == 0
            data["missing_info"] = missing
            return data
    except Exception:
        pass
    return None


async def _fetch_context(message: str) -> str:
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

    is_asking_generic_cars = any(x in msg_low for x in ["option nào", "lựa chọn nào", "có gì", "xe gì", "còn gì", "liệt kê", "danh sách"])
    if not cars or is_asking_generic_cars:
        cars = await db.cars.find({}).sort("price", 1).limit(5).to_list(5)

    is_parts_query = _is_asking_about_parts(message)
    is_services_query = _is_asking_about_services(message)

    if not parts and is_parts_query:
        parts = await db.parts.find({"status": "active"}).sort("sold_count", -1).limit(5).to_list(5)
    if not services and is_services_query:
        services = await db.serviceitems.find({"isActive": True}).sort("basePrice", 1).limit(5).to_list(5)

    if not any([cars, parts, services]) and clean_msg:
        words = [w for w in clean_msg.split() if len(w) > 2]
        if words:
            word_regex = {"$regex": "|".join(re.escape(w) for w in words), "$options": "i"}
            cars, parts, services = await _query_all(word_regex, price_filter)

    segments = []
    if cars:
        segments.append("Xe tại shop: " + " | ".join(
            f"{c['name']} ({c.get('year', 'N/A')}) - {c.get('price', 0):,.0f} VND" for c in cars
        ))
    if parts:
        segments.append("Phụ tùng/Linh kiện tại shop: " + " | ".join(
            f"{p['name']} - {p.get('price', p.get('original_price', 0)):,.0f} VND" for p in parts
        ))
    if services:
        segments.append("Dịch vụ tại shop: " + " | ".join(
            f"{s['serviceName']} - {s.get('basePrice', 0):,.0f} VND ({s.get('priceType', 'CONTACT')})" for s in services
        ))

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
        parts = await db.parts.find({
            "$and": [
                {"$or": [{"name": keyword_regex}, {"category": keyword_regex}, {"brand": keyword_regex}]},
                {"status": "active"},
            ]
        }).limit(3).to_list(3)

        services = await db.serviceitems.find({
            "$and": [
                {"$or": [{"serviceName": keyword_regex}, {"description": keyword_regex}]},
                {"isActive": True},
            ]
        }).limit(3).to_list(3)

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

    is_booking = _is_booking_intent(message)
    is_private = _is_personal_query(message)
    cache_key = _normalize_key(message, user_id if is_private else None)

    if not is_booking:
        cached = await redis_client.get(cache_key)
        if cached:
            answer = await _rephrase_answer(cached, message)
            await _save_message(user_id, conv_id, "user", message)
            await _save_message(user_id, conv_id, "assistant", answer)
            return {"answer": answer, "conversation_id": conv_id, "title": title, "booking_draft": None}

    await _wait_for_rate_limit()

    history = await _get_history(conv_id)

    booking_draft = None

    if _is_greeting(message):
        system_prompt = SYSTEM_GREETING
    elif is_booking:
        booking_info = await _extract_booking_details(message)
        booking_draft = booking_info or {}
        if booking_info and booking_info.get("is_complete"):
            system_prompt = (
                "Bạn là trợ lý ảo của CarsShop. Khách vừa yêu cầu đặt lịch dịch vụ và đã cung cấp đủ thông tin cơ bản. "
                "Thông báo ngắn gọn rằng phiếu đặt lịch đã hiện bên dưới, khách kiểm tra lại và nhấn xác nhận. "
                "Không dùng Markdown."
            )
        else:
            system_prompt = (
                "Bạn là trợ lý ảo của CarsShop. Khách vừa yêu cầu đặt lịch dịch vụ. "
                "Thông báo thân thiện rằng phiếu đặt lịch đã hiện bên dưới với thông tin đã điền sẵn, "
                "khách vui lòng bổ sung các thông tin còn thiếu rồi nhấn xác nhận. Không dùng Markdown."
            )
    else:
        context = await _fetch_context(message)
        system_prompt = SYSTEM_TEMPLATE.format(context=context)

    messages_to_send = _build_messages(system_prompt, history, message)

    try:
        answer = await _invoke_with_backoff(messages_to_send)
    except RuntimeError as e:
        if str(e) == "quota_exceeded":
            return {"answer": QUOTA_EXCEEDED_MSG, "conversation_id": conv_id, "title": title, "booking_draft": None}
        raise

    await _save_message(user_id, conv_id, "user", message)
    await _save_message(user_id, conv_id, "assistant", answer)

    if not is_booking:
        await redis_client.setex(cache_key, 3600, answer)

    return {"answer": answer, "conversation_id": conv_id, "title": title, "booking_draft": booking_draft}
