import "./telemetry/scheduler.js";
import express from "express";
import telemetryRoutes from "./routes/telemetry.js";

const app = express();
app.use(telemetryRoutes);

app.listen(3000, () => console.log("Servidor con telemetría activo"));
