import { API_BASE_URL } from '../config/api';

const API_BASE = `${API_BASE_URL}/api/auth`;

export const authService = {
  async login(email, password) {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }

    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Invalid email or password.');
    }

    const userObj = {
      id: data._id,
      name: data.name,
      email: data.email,
      role: data.role
    };
    localStorage.setItem('citizen_portal_token', data.token);
    localStorage.setItem('citizen_portal_user', JSON.stringify(userObj));
    return { user: userObj, token: data.token };
  },

  async signup(data) {
    if (!data.name || !data.email || !data.password) {
      throw new Error('Please fill in all required fields.');
    }
    if (data.password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const res = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
        role: data.role || 'citizen'
      })
    });

    const resData = await res.json();

    if (!res.ok) {
      throw new Error(resData.message || 'Signup failed. User may already exist with this email.');
    }

    const userObj = {
      id: resData._id,
      name: resData.name,
      email: resData.email,
      role: resData.role
    };
    localStorage.setItem('citizen_portal_token', resData.token);
    localStorage.setItem('citizen_portal_user', JSON.stringify(userObj));
    return { user: userObj, token: resData.token };
  },

  async logout() {
    localStorage.removeItem('citizen_portal_token');
    localStorage.removeItem('citizen_portal_user');
    return true;
  }
};
