import asyncio
from app.services.ai_engine import _extract_price, _fetch_context

async def test_rag_v2():
    print("Test 3: 'dưới 3 tỷ'")
    msg = "dưới 3 tỷ thì có không"
    price = _extract_price(msg)
    print(f"Price extracted: {price}")
    ctx = await _fetch_context(msg)
    print(f"Context fetched: {ctx}")
    print("-" * 50)

    print("Test 4: 'vậy còn những option nào'")
    msg = "vậy còn những option nào"
    ctx = await _fetch_context(msg)
    print(f"Context fetched: {ctx}")
    print("-" * 50)

    print("Test 5: 'tầm giá 3 tỷ'")
    msg = "cho tôi những option tầm giá 3 tỷ có ở shop"
    ctx = await _fetch_context(msg)
    print(f"Context fetched: {ctx}")

if __name__ == "__main__":
    asyncio.run(test_rag_v2())
