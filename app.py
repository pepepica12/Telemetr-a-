import os
from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# ---------------------------------------------------------
# Inicialización de la app
# ---------------------------------------------------------
app = Flask(__name__)
CORS(app)

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

# ---------------------------------------------------------
# Ejecutar servidor
# ---------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)