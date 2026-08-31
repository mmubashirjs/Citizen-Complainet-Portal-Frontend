import { API_BASE_URL } from '../config/api';

const API_BASE = `${API_BASE_URL}/api/complaints`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('citizen_portal_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const mapBackendToFrontend = (item) => {
  if (!item) return null;
  return {
    id: item._id || item.id,
    title: item.title,
    category: item.category,
    area: item.area,
    description: item.description,
    status: item.status || 'Pending',
    priority: item.priorityBadge || item.priority || 'Medium',
    upvotes: item.upvotes || 0,
    upvotedBy: item.upvotedBy ? item.upvotedBy.map((u) => typeof u === 'object' ? u._id : u) : [],
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString(),
    photoUrl: item.imageUrl || item.photoUrl || null,
    citizen: {
      id: item.createdBy?._id || item.citizen?.id || 'cit-101',
      name: item.createdBy?.name || item.citizen?.name || 'Citizen User',
      email: item.createdBy?.email || item.citizen?.email || 'citizen@example.com'
    },
    officerRemarks: item.officerRemark ? [
      {
        id: `rem-${item._id}`,
        officerName: 'Municipal Officer',
        department: 'Capital Operations',
        date: item.updatedAt || new Date().toISOString(),
        text: item.officerRemark
      }
    ] : item.officerRemarks || [],
    history: item.history || [
      { status: item.status || 'Submitted', date: item.createdAt || new Date().toISOString(), label: `Complaint in ${item.status || 'Submitted'} state` }
    ],
    feedbackPending: item.feedbackPending || false,
    feedback: item.feedbackGiven ? {
      rating: item.feedbackRating,
      comment: item.feedbackComment,
      submittedAt: item.updatedAt
    } : item.feedback || null
  };
};

export const complaintService = {
  async getComplaints(filters = {}) {
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.category && filters.category !== 'All') queryParams.append('category', filters.category);
    if (filters.status && filters.status !== 'All') queryParams.append('status', filters.status);
    if (filters.area && filters.area !== 'All') queryParams.append('area', filters.area);

    const url = `${API_BASE}?${queryParams.toString()}`;
    const res = await fetch(url, { headers: getAuthHeaders() });

    if (!res.ok) {
      throw new Error('Failed to fetch complaints from backend.');
    }

    const data = await res.json();
    let list = data.map(mapBackendToFrontend);

    if (filters.priority && filters.priority !== 'All') {
      list = list.filter((c) => c.priority === filters.priority);
    }

    if (filters.sort === 'Most Upvoted') {
      list.sort((a, b) => b.upvotes - a.upvotes);
    } else if (filters.sort === 'Highest Priority') {
      const pOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      list.sort((a, b) => pOrder[b.priority] - pOrder[a.priority]);
    } else if (filters.sort === 'Oldest') {
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return list;
  },

  async getMyComplaints() {
    const res = await fetch(`${API_BASE}/mine`, { headers: getAuthHeaders() });
    if (!res.ok) {
      throw new Error('Failed to fetch user complaints.');
    }
    const data = await res.json();
    return data.map(mapBackendToFrontend);
  },

  async getComplaintById(id) {
    const res = await fetch(`${API_BASE}/${id}`, { headers: getAuthHeaders() });
    if (!res.ok) {
      throw new Error(`Complaint #${id} not found.`);
    }
    const item = await res.json();
    return mapBackendToFrontend(item);
  },

  async createComplaint(data) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title: data.title,
        category: data.category,
        area: data.area,
        description: data.description,
        imageUrl: data.photoUrl || ''
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to create complaint.');
    }

    const item = await res.json();
    return mapBackendToFrontend(item);
  },

  async checkDuplicates(category, area) {
    if (!category || !area) return null;
    try {
      const queryParams = new URLSearchParams({ category, area });
      const res = await fetch(`${API_BASE}?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        const active = data.find((c) => c.status !== 'Resolved');
        if (active) return mapBackendToFrontend(active);
      }
    } catch {
      return null;
    }
    return null;
  },

  async upvoteComplaint(id) {
    const res = await fetch(`${API_BASE}/${id}/upvote`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'Failed to upvote complaint.');
    }

    const updated = await res.json();
    return { upvotes: updated.upvotes, isUpvoted: true };
  },

  async updateComplaintStatus(id, newStatus, remarkText) {
    const res = await fetch(`${API_BASE}/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        status: newStatus,
        officerRemark: remarkText
      })
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'Failed to update complaint status.');
    }

    const item = await res.json();
    return mapBackendToFrontend(item);
  },

  async submitFeedback(id, rating, comment) {
    const res = await fetch(`${API_BASE}/${id}/feedback`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        rating,
        feedbackComment: comment
      })
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'Failed to submit feedback.');
    }

    const item = await res.json();
    return mapBackendToFrontend(item);
  }
};
