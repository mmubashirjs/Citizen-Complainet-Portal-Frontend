import { API_BASE_URL } from '../config/api';

const API_BASE = `${API_BASE_URL}/api/ai`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('citizen_portal_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const aiService = {
  async getOfficerSummary() {
    const res = await fetch(`${API_BASE}/officer-summary`, {
      method: 'POST',
      headers: getAuthHeaders()
    });

    if (!res.ok) {
      throw new Error('Failed to fetch AI daily briefing from backend.');
    }

    const data = await res.json();
    return data;
  }
};
