import express from "express";
import pool from "./db.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.json({ status: "Telemetr-a API running" });
});

// GET /dispositivos
app.get("/dispositivos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM dispositivos ORDER BY id ASC");
    res.json({ ok: true, data: result.rows });
  } catch (error) {
    console.error("Error GET /dispositivos:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

// POST /dispositivos
app.post("/dispositivos", async (req, res) => {
  const { uuid_dispositivo, plataforma, descripcion } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO dispositivos (uuid_dispositivo, plataforma, descripcion)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [uuid_dispositivo, plataforma, descripcion]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error POST /dispositivos:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

// Endpoint de prueba existente
app.post("/analyze", (req, res) => {
  res.json({
    received: req.body,
    message: "Analysis endpoint operational"
  });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
app.post("/eventos", async (req, res) => {
  try {
    const { repo, evento, detalle } = req.body;

    const result = await pool.query(
      `INSERT INTO eventos (repo, evento, detalle)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [repo, evento, detalle || {}]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error en /eventos:", error);
    res.status(500).json({ ok: false, error: "Error interno" });
  }
});
app.post("/logs", async (req, res) => {
  try {
    const { repo, nivel, mensaje } = req.body;

    const result = await pool.query(
      `INSERT INTO logs (repo, nivel, mensaje)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [repo, nivel || "info", mensaje]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error en /logs:", error);
    res.status(500).json({ ok: false, error: "Error interno" });
  }
});
app.post("/metricas", async (req, res) => {
  try {
    const { repo, cpu, memoria, tiempo_respuesta, extra } = req.body;

    const result = await pool.query(
      `INSERT INTO metricas (repo, cpu, memoria, tiempo_respuesta, extra)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [repo, cpu, memoria, tiempo_respuesta, extra || {}]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error en /metricas:", error);
    res.status(500).json({ ok: false, error: "Error interno" });
  }
});

