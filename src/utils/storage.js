// Thin wrapper around localStorage so every read/write is JSON-safe
// and lives in one place (easy to swap for a real API later).

const PREFIX = "fareshare:";

export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — fail silently, app still works in-memory
  }
}

export function removeKey(key) {
  localStorage.removeItem(PREFIX + key);
}
