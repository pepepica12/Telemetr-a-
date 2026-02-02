import os
from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from api.registro import registro_bp

# ---------------------------------------------------------
# Inicialización de la app
# ---------------------------------------------------------
app = Flask(__name__)
CORS(app)
app.register_blueprint(registro_bp)

# ---------------------------------------------------------
# Configuración de base de datos
# ---------------------------------------------------------
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/telemetria.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ---------------------------------------------------------
# Rutas base
# ---------------------------------------------------------
@app.route('/')
def index():
    return "Backend Flask conectado a Railway 🚀"

@app.route('/status')
def status():
    return "OK"

@app.route('/saludo/<nombre>')
def saludo(nombre):
    return f"Hola, {nombre}!"

@app.route('/sensor/<int:id>')
def sensor(id):
    return f"Datos del sensor {id}"

@app.route('/api/info')
def info():
    return jsonify({
        "status": "ok",
        "version": "1.0",
        "backend": "Railway"
    })

# ---------------------------------------------------------
# Providers (stub por ahora)
# ---------------------------------------------------------
@app.route("/providers/health", methods=["GET"])
def providers_health():
    return jsonify({
        "telegram": {"ok": True},
        "whatsapp": {"ok": True},
        "nefosys": {"ok": True},
        "scheduler": {"ok": True}
    })

@app.route("/providers/test", methods=["GET", "POST"])
def providers_test():
    provider = request.args.get("provider", "all")
    return jsonify({
        "status": "ok",
        "provider": provider,
        "message": "Test ejecutado (stub). Integra aquí la llamada real a providers."
    })

@app.route("/providers/events", methods=["POST"])
def providers_events():
    data = request.json or {}
    return jsonify({
        "status": "received",
        "data": data
    })

# ---------------------------------------------------------
# Dashboard HTML (si usas templates/)
# ---------------------------------------------------------
@app.route("/dashboard/providers")
def providers_dashboard():
    return render_template("providers_dashboard.html")

import requests

TELEMETRY_NODE_URL = "https://telemtrenode123455928q7qu.vercel.app"

def send_telemetry(event_type, payload):
    try:
        url = f"{TELEMETRY_NODE_URL}/event"
        data = {
            "type": event_type,
            "payload": payload,
        }
        requests.post(url, json=data, timeout=3)
    except Exception as e:
        print("[telemetry-error]", e)

from flask import request, jsonify

@app.route("/search", methods=["POST"])
def search():
    body = request.get_json(force=True)
    query = body.get("query", "")
    send_telemetry("search_request", {"query": query})
    return jsonify({"ok": True, "query": query})

from flask import render_template

@app.route("/dashboard/telemetry", methods=["GET"])
def telemetry_dashboard():
    return render_template("telemetry_dashboard.html")

# ---------------------------------------------------------
# Ejecutar servidoro
# ---------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
