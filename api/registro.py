from flask import Blueprint, request, jsonify
import asyncio
import asyncpg

# Blueprint para integrar este módulo a la app principal
registro_bp = Blueprint("registro", __name__)

# Cadena real de conexión a Neon
DATABASE_URL = "postgresql://neondb_owner:npg_FYTwJ4vrkeC5@ep-round-rain-ahoj1chj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

async def insert_user(email, ip_publica):
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        # Crear tabla si no existe
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                email TEXT NOT NULL,
                ip_publica TEXT NOT NULL,
                fecha TIMESTAMP DEFAULT NOW()
            )
        """)

        # Insertar usuario
        await conn.execute(
            "INSERT INTO usuarios (email, ip_publica) VALUES ($1, $2)",
            email, ip_publica
        )

        return {"status": "ok", "email": email, "ip": ip_publica}

    except Exception as e:
        return {"status": "error", "detail": str(e)}

    finally:
        await conn.close()

@registro_bp.route("/registro", methods=["POST"])
async def registro():
    data = request.get_json()
    email = data.get("email")
    ip_publica = request.remote_addr

    result = await insert_user(email, ip_publica)
    return jsonify(result)
