import fs from "fs";
import fetch from "node-fetch"; // o global fetch en runtimes modernos

const LOGFILE = "./search.log";

function log(msg, extra = null) {
  const line = `[${new Date().toISOString()}] ${msg}` +
               (extra ? ` | ${JSON.stringify(extra)}` : "");
  fs.appendFileSync(LOGFILE, line + "\n");
}

export class SearchEngine {
  constructor({ provider, apiKey, endpoint }) {
    this.provider = provider;      // "serpapi", "custom", "internal", etc.
    this.apiKey = apiKey || null;
    this.endpoint = endpoint;      // URL base del proveedor
  }

  async search(query, options = {}) {
    const startedAt = Date.now();
    log("SEARCH_START", { provider: this.provider, query, options });

    try {
      const results = await this.#dispatchSearch(query, options);
      const duration = Date.now() - startedAt;

      const normalized = this.#normalizeResults(results);

      log("SEARCH_SUCCESS", {
        provider: this.provider,
        query,
        durationMs: duration,
        resultCount: normalized.length
      });

      return {
        provider: this.provider,
        query,
        durationMs: duration,
        results: normalized
      };
    } catch (err) {
      log("SEARCH_ERROR", {
        provider: this.provider,
        query,
        error: err.message
      });
      throw err;
    }
  }

  async #dispatchSearch(query, options) {
    switch (this.provider) {
      case "serpapi":
        return this.#searchSerpApi(query, options);
      case "custom":
        return this.#searchCustom(query, options);
      default:
        throw new Error(`Proveedor no soportado: ${this.provider}`);
    }
  }

  async #searchSerpApi(query, options) {
    if (!this.apiKey) {
      throw new Error("Falta API key para SerpAPI");
    }

    const url = new URL(this.endpoint || "https://serpapi.com/search");
    url.searchParams.set("q", query);
    url.searchParams.set("api_key", this.apiKey);
    url.searchParams.set("engine", options.engine || "google");

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} en SerpAPI`);
    }
    return res.json();
  }

  async #searchCustom(query, options) {
    if (!this.endpoint) {
      throw new Error("Falta endpoint para proveedor custom");
    }

    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, options })
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} en proveedor custom`);
    }
    return res.json();
  }

  #normalizeResults(raw) {
    // Aquí adaptas según el proveedor.
    // Ejemplo genérico:
    if (!raw) return [];

    if (raw.organic_results) {
      return raw.organic_results.map(r => ({
        title: r.title,
        url: r.link,
        snippet: r.snippet || r.snippet_highlighted_words?.join(" ") || "",
        source: this.provider
      }));
    }

    if (Array.isArray(raw.results)) {
      return raw.results.map(r => ({
        title: r.title || "",
        url: r.url || "",
        snippet: r.snippet || "",
        source: this.provider
      }));
    }

    return [];
  }
}