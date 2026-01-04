import { runAction } from "./runner.js";

export function procesarEvento(evento) {
    if (evento.tipo === "error_critico") {
        runAction("reiniciarServicio");
    }

    if (evento.tipo === "backup") {
        runAction("ejecutarScript");
    }
}
