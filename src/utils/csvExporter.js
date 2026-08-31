import { API_BASE_URL } from '../config/api';

// Utility for exporting complaints CSV directly from live backend API
export const exportComplaintsCSV = async (complaints, filename = "citizen_complaints_export.csv") => {
  const token = localStorage.getItem('citizen_portal_token');

  if (token) {
    const res = await fetch(`${API_BASE_URL}/api/complaints/export`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }
  }

  if (!complaints || !complaints.length) return false;

  const headers = [
    "Reference ID",
    "Title",
    "Category",
    "Area / Locality",
    "Status",
    "Priority",
    "Upvotes",
    "Citizen Name",
    "Citizen Email",
    "Filed Date",
    "Last Updated"
  ];

  const escapeCSV = (str) => {
    if (str === null || str === undefined) return '""';
    const stringified = String(str).replace(/"/g, '""');
    return `"${stringified}"`;
  };

  const rows = complaints.map((c) => [
    escapeCSV(c.id),
    escapeCSV(c.title),
    escapeCSV(c.category),
    escapeCSV(c.area),
    escapeCSV(c.status),
    escapeCSV(c.priority),
    c.upvotes || 0,
    escapeCSV(c.citizen?.name || 'N/A'),
    escapeCSV(c.citizen?.email || 'N/A'),
    escapeCSV(new Date(c.createdAt).toLocaleDateString()),
    escapeCSV(new Date(c.updatedAt).toLocaleDateString())
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
};
