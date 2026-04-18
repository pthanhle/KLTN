import json
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage, SystemMessage, AIMessage
from ..core.config import settings
from ..core.database import db

llm = ChatGoogleGenerativeAI(
    model=settings.MODEL_NAME,
    google_api_key=settings.GEMINI_API_KEY,
    temperature=0.7
)

async def get_chat_history(user_id: str, limit: int = 10):
    cursor = db.chathistories.find({"user_id": user_id}).sort("timestamp", -1).limit(limit)
    history = await cursor.to_list(length=limit)
    return history[::-1]

async def save_chat_message(user_id: str, role: str, content: str):
    await db.chathistories.insert_one({
        "user_id": user_id,
        "role": role,
        "content": content,
        "timestamp": __import__("datetime").datetime.utcnow()
    })

async def classify_intent(message: str):
    prompt = f"""
    Bạn là chuyên gia phân loại ý định của khách hàng cho CarsShop.
    Trả về JSON: {{ "intent": "product_search" | "service_search" | "category_check" | "order_tracking" | "booking_tracking" | "tradein_check" | "general", "keyword": string | null }}
    
    Câu hỏi: "{message}"
    JSON:"""
    res = await llm.ainvoke([SystemMessage(content=prompt)])
    content = res.content.replace("```json", "").replace("```", "").strip()
    try:
        return json.loads(content)
    except:
        return {"intent": "general", "keyword": None}

async def get_context(intent_data: dict, user_id: str):
    intent = intent_data.get("intent")
    keyword = intent_data.get("keyword")
    
    if not keyword and intent != "category_check":
        return "Thông tin chung: CarsShop chuyên cung cấp xe hơi hạng sang và dịch vụ bảo dưỡng."

    if intent == "category_check":
        categories = await db.categories.find().to_list(10)
        return "Danh mục: " + ", ".join([c["category_name"] for c in categories])
    
    if intent == "product_search":
        regex = {"$regex": keyword, "$options": "i"}
        products = await db.parts.find({"$or": [{"name": regex}, {"category": regex}]}).limit(5).to_list(5)
        return "Sản phẩm: " + "\n".join([f"{p['name']}: {p['price']} VND" for p in products])
    
    if intent == "service_search":
        regex = {"$regex": keyword, "$options": "i"}
        services = await db.servicepackages.find({"$or": [{"service_name": regex}, {"description": regex}]}).limit(5).to_list(5)
        return "Dịch vụ: " + "\n".join([f"{s['service_name']}: {s['price']} VND" for s in services])

    return "Không tìm thấy dữ liệu phù hợp."

async def generate_response(user_id: str, message: str):
    history = await get_chat_history(user_id)
    intent_data = await classify_intent(message)
    context = await get_context(intent_data, user_id)
    
    messages = [SystemMessage(content=f"Bạn là trợ lý ảo CarsShop. Dữ liệu thực tế: {context}. Không dùng Markdown.")]
    for h in history:
        if h["role"] == "user":
            messages.append(HumanMessage(content=h["content"]))
        else:
            messages.append(AIMessage(content=h["content"]))
    
    messages.append(HumanMessage(content=message))
    
    res = await llm.ainvoke(messages)
    answer = res.content.replace("**", "").replace("*", "-")
    
    await save_chat_message(user_id, "user", message)
    await save_chat_message(user_id, "assistant", answer)
    
    return answer
