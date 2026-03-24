/**
 * Backend API client — barcha so'rovlar shu orqali
 */
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

function getAuthHeaders() {
  const token = localStorage.getItem("sputnik_admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Rasm URL'ini to'liq qilish (backend /api/uploads/... ni to'g'ri ko'rsatishi uchun) */
export function resolveImageUrl(url) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
}

async function request(endpoint, options = {}, useAuth = false) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...(useAuth ? getAuthHeaders() : {}),
    ...options.headers,
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    if (res.status === 401 && useAuth) {
      localStorage.removeItem("sputnik_admin_token");
      window.location.href = "/admin/login";
    }
    const err = new Error(res.statusText || "API xatosi");
    err.status = res.status;
    err.body = await res.text();
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  projects: {
    getAll: () => request("/api/projects"),
    create: (data) => request("/api/projects", { method: "POST", body: JSON.stringify(data) }, true),
    delete: (id) => request(`/api/projects/${id}`, { method: "DELETE" }, true),
  },
  feedbacks: {
    getAll: () => request("/api/feedbacks"),
    create: (data) => request("/api/feedbacks", { method: "POST", body: JSON.stringify(data) }, true),
    delete: (id) => request(`/api/feedbacks/${id}`, { method: "DELETE" }, true),
  },
  offers: {
    getAll: () => request("/api/offers"),
    create: (data) => request("/api/offers", { method: "POST", body: JSON.stringify(data) }, true),
    delete: (id) => request(`/api/offers/${id}`, { method: "DELETE" }, true),
  },
};
