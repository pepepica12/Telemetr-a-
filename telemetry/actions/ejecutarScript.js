import { SearchEngine } from "../searchEngine.js";

export default async function () {
  const engine = new SearchEngine({
    provider: "custom",
    endpoint: "https://tu-api.com/search"
  });

  return await engine.search("consulta de ejemplo");
}