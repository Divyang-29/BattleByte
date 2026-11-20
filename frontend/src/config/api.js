const API_URL = import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io";

// In-memory cache to prevent redundant re-fetching when navigating between pages
const apiCache = new Map();

export async function fetchWithCache(url, options = {}, ttlMs = 120000) {
  const isGet = !options.method || options.method.toUpperCase() === "GET";
  if (!isGet) {
    const res = await fetch(url, options);
    return res.json();
  }

  const cached = apiCache.get(url);
  if (cached && Date.now() - cached.timestamp < ttlMs) {
    return cached.data;
  }

  const res = await fetch(url, options);
  const data = await res.json();
  apiCache.set(url, { timestamp: Date.now(), data });
  return data;
}

export function clearApiCache() {
  apiCache.clear();
}

export default API_URL;
export { API_URL };
