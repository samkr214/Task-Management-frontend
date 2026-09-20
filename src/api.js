const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error("Unable to connect to the API. Is the backend server running?");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
    }
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  register: (payload) =>
    request("/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    request("/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getTasks: () => request("/tasks"),

  getTask: (id) => request(`/tasks/${id}`),

  createTask: (payload) =>
    request("/tasks", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  updateTask: (id, payload) =>
    request(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  deleteTask: (id) =>
    request(`/tasks/${id}`, {
      method: "DELETE",
    }),
};