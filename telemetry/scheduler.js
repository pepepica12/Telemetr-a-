import cron from "node-cron";
import { runAction } from "./runner.js";
import { procesarEvento } from "./events.js";



// Ejecuta cada minuto
cron.schedule("* * * * *", () => {
    runAction("ejecutarScript");
});

// Cada 10 segundos
cron.schedule("*/10 * * * * *", () => {
    runAction("limpiarCache");
});
