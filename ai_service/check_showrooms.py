import asyncio
from app.core.database import db

async def check_showrooms():
    docs = await db.showrooms.find().to_list(10)
    print("Thông tin Showroom:")
    for d in docs:
        print(d)

if __name__ == "__main__":
    asyncio.run(check_showrooms())
