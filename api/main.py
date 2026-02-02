from fastapi import FastAPI
from pydantic import BaseModel
import asyncpg

app = FastAPI()

import os
DATABASE_URL = os.getenv("DATABASE_URL")

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
