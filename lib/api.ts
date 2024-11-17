const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(errorDetail.message || 'Login failed');
  }

  const data = await response.json();
  return data.token;
}

export async function registerUser(email: string, password: string, switchbotToken: string) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, switchbotToken }),
  });

  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(errorDetail.message || 'Registration failed');
  }
}

export async function getDevices() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/devices`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(errorDetail.message || 'Failed to fetch devices');
  }

  return response.json();
}

export async function controlDevice(id: string, command: string) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/devices/${id}/control`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ command }),
  });

  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(errorDetail.message || 'Failed to control device');
  }
}

export async function updateUser(email: string, password: string, switchbotToken: string) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/account`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, switchbotToken }),
  });

  if (!response.ok) {
    const errorDetail = await response.json();
    throw new Error(errorDetail.message || 'Failed to update account');
  }
}