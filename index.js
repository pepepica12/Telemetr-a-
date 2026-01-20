import express from "express";
import pool from "./db.js";

const app = express();
app.use(express.json());

app.post("/log", async (req, res) => {
  try {
    const { origen, nivel, mensaje, contexto } = req.body;

    const result = await pool.query(
      `INSERT INTO logs (origen, nivel, mensaje, contexto)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [origen, nivel, mensaje, contexto]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error al insertar log:", err);
    res.status(500).json({ ok: false, error: "Error interno" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor Telemetr-a- activo en puerto", PORT);
});

app.post("/dispositivo", async (req, res) => {
  try {
    const { uuid_dispositivo, plataforma, descripcion } = req.body;

    const result = await pool.query(
      `INSERT INTO dispositivos (uuid_dispositivo, plataforma, descripcion)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [uuid_dispositivo, plataforma, descripcion]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error al registrar dispositivo:", err);
    res.status(500).json({ ok: false, error: "Error interno" });
  }
});

app.post("/telemetria", async (req, res) => {
  try {
    const { uuid_dispositivo, tipo, valor, unidad, payload } = req.body;

    const dispositivoRes = await pool.query(
      "SELECT id FROM dispositivos WHERE uuid_dispositivo = $1",
      [uuid_dispositivo]
    );

    let dispositivoId = null;
    if (dispositivoRes.rows.length > 0) {
      dispositivoId = dispositivoRes.rows[0].id;
    }

    const result = await pool.query(
      `INSERT INTO telemetria (dispositivo_id, tipo, valor, unidad, payload)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [dispositivoId, tipo, valor, unidad, payload]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error al registrar telemetria:", err);
    res.status(500).json({ ok: false, error: "Error interno" });
  }
});

app.post("/evento", async (req, res) => {
  try {
    const { tipo, descripcion, fuente, metadata } = req.body;

    const result = await pool.query(
      `INSERT INTO eventos (tipo, descripcion, fuente, metadata)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [tipo, descripcion, fuente, metadata]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error al registrar evento:", err);
    res.status(500).json({ ok: false, error: "Error interno" });
  }
});

app.get("/logs", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM logs ORDER BY id DESC LIMIT 50"
    );
    res.json({ ok: true, data: result.rows });
  } catch (err) {
    console.error("Error al obtener logs:", err);
    res.status(500).json({ ok: false, error: "Error interno" });
  }
});

app.get("/dispositivos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM dispositivos ORDER BY id DESC"
    );
    res.json({ ok: true, data: result.rows });
  } catch (err) {
    console.error("Error al obtener dispositivos:", err);
    res.status(500).json({ ok: false, error: "Error interno" });
  }
});

app.get("/telemetria/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    const dispositivoRes = await pool.query(
      "SELECT id FROM dispositivos WHERE uuid_dispositivo = $1",
      [uuid]
    );

    if (dispositivoRes.rows.length === 0) {
      return res.json({ ok: true, data: [] });
    }

    const dispositivoId = dispositivoRes.rows[0].id;

    const result = await pool.query(
      "SELECT * FROM telemetria WHERE dispositivo_id = $1 ORDER BY id DESC LIMIT 50",
      [dispositivoId]
    );

    res.json({ ok: true, data: result.rows });
  } catch (err) {
    console.error("Error al obtener telemetria:", err);
    res.status(500).json({ ok: false, error: "Error interno" });
  }
});

app.get("/eventos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM eventos ORDER BY id DESC LIMIT 50"
    );
    res.json({ ok: true, data: result.rows });
  } catch (err) {
    console.error("Error al obtener eventos:", err);
    res.status(500).json({ ok: false, error: "Error interno" });
  }
});
