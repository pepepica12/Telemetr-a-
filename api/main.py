from fastapi import FastAPI
from pydantic import BaseModel
import asyncpg

app = FastAPI()

DATABASE_URL = "postgresql://neondb_owner:npg_FYTwJ4vrkeC5@ep-round-rain-ahoj1chj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

class Registro(BaseModel):
    email: str
    ip: str | None = None

async def get_connection():
    return await asyncpg.connect(DATABASE_URL)

@app.post("/registro")
async def registro(data: Registro):
    conn = await get_connection()

    await conn.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            email TEXT,
            ip TEXT
        )
    """)

    await conn.execute(
        "INSERT INTO usuarios (email, ip) VALUES ($1, $2)",
        data.email,
        data.ip
    )

    await conn.close()

    return {"status": "ok", "email": data.email, "ip": data.ip}
