import { runScript } from "../runner.js";

export default async function () {
    const output = await runScript("bash ./telemetry/scripts/script1.sh");
    return { status: "script ejecutado", output };
}
