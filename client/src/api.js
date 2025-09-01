const API_URL = "http://localhost:5000/api";

// Login function
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data; // { token, role, name }
};

// Get subscriptions
export const getSubscriptions = async (token) => {
  if (!token) throw new Error("Token missing");

  const res = await fetch(`${API_URL}/subscriptions`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch subscriptions");

  return Array.isArray(data) ? data : [];
};

// Create subscription
export const createSubscription = async (token, subscriptionData) => {
  if (!token) throw new Error("Token missing");

  const res = await fetch(`${API_URL}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscriptionData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create subscription");
  return data;
};

// Update subscription
export const updateSubscription = async (token, id, subscriptionData) => {
  if (!token) throw new Error("Token missing");

  const res = await fetch(`${API_URL}/subscriptions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscriptionData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update subscription");
  return data;
};

// Delete subscription
export const deleteSubscription = async (token, id) => {
  if (!token) throw new Error("Token missing");

  const res = await fetch(`${API_URL}/subscriptions/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete subscription");
  return data;
};
// Users API
export const getUsers = async (token) => {
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch users");
  return data;
};

export const createUser = async (token, userData) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create user");
  return data;
};

export const updateUser = async (token, id, userData) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update user");
  return data;
};

export const deleteUser = async (token, id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete user");
  return data;
};

