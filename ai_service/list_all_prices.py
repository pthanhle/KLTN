import asyncio
from app.core.database import db

async def check_all_cars():
    cursor = db.cars.find({}, {"price": 1, "name": 1})
    print("Danh sách xe và giá:")
    async for doc in cursor:
        print(f"- {doc.get('name')}: {doc.get('price', 0):,.0f} VND")

if __name__ == "__main__":
    asyncio.run(check_all_cars())
