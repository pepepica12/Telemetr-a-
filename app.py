import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/telemetria.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from flask_cors import CORS
CORS(app)

db = SQLAlchemy(app)

@app.route('/')
def index():
    return "Backend Flask conectado a Railway 🚀"

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

@app.route('/status')
def status():
    return "OK"

@app.route('/saludo/<nombre>')
def saludo(nombre):
    return f"Hola, {nombre}!"

@app.route('/sensor/<int:id>')
def sensor(id):
    return f"Datos del sensor {id}"

from flask import jsonify

@app.route('/api/info')
def info():
    return jsonify({
        "status": "ok",
        "version": "1.0",
        "backend": "Railway"
    })
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/providers/health", methods=["GET"])
def providers_health():
    # Aquí podrías integrar con un servicio Node que ejecute providers/health.js
    # Por ahora devolvemos un stub coherente
    return jsonify({
        "telegram": {"ok": True},
        "whatsapp": {"ok": True},
        "nefosys": {"ok": True},
        "scheduler": {"ok": True}
    })

@app.route("/providers/test", methods=["POST", "GET"])
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
    # Aquí podrías escribir en telemetry_events.log o enviar a Nefosys
    return jsonify({
        "status": "received",
        "data": data
    })
