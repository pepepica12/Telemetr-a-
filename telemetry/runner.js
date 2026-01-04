import { exec } from "child_process";
import fs from "fs";

function log(msg) {
    const linea = `[${new Date().toISOString()}] ${msg}`;
    fs.appendFileSync("telemetry.log", linea + "\n");
}
export async function runAction(actionName) {
    try {
        const action = await import(`./actions/${actionName}.js`);
        const result = await action.default();
        log(`Acción ejecutada: ${actionName}`);
        console.log(`[OK] Acción ejecutada: ${actionName}`, result);
    } catch (err) {
        console.error(`[ERROR] Acción falló: ${actionName}`, err);
    }
}

export async function runScript(scriptPath) {
    return new Promise((resolve, reject) => {
        exec(scriptPath, (err, stdout, stderr) => {
            if (err) return reject(err);
            resolve(stdout);
        });
    });
}
