import { SearchEngine } from "./searchEngine.js";

async function main() {
  const query = process.argv.slice(2).join(" ");
  if (!query) {
    console.log("Uso: node index.js <consulta>");
    process.exit(1);
  }

  const engine = new SearchEngine({
    provider: "custom", // o "serpapi"
    apiKey: process.env.SERPAPI_KEY,
    endpoint: process.env.SEARCH_ENDPOINT // tu API interna, Elastic, etc.
  });

  try {
    const result = await engine.search(query, { engine: "google" });
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Error en búsqueda:", err.message);
  }
}

main();