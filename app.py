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
