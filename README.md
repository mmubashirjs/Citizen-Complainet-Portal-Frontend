# 🏛️ Citizen Complaint Portal

A MERN-stack civic engagement platform that connects citizens with local authorities to report, upvote, and resolve community issues transparently.

---

## ⚡ Features

### 👤 For Citizens
- **Quick Issue Reporting:** File complaints (Roads, Water, Garbage, Electricity) with photo attachments.
- **Duplicate Prevention:** Auto-detects similar active complaints in the area and prompts to upvote instead.
- **Public Feed & Upvoting:** Search, filter, and upvote local issues to increase their urgency.
- **Status Tracking & Feedback:** Monitor progress in real-time and submit 1–5 star ratings upon resolution.

### 👮 For Officers
- **Admin Dashboard:** Centralized view to filter, search, and manage complaints by status or category.
- **Auto Priority Scoring:** Dynamic badges (`Low`, `Medium`, `High`, `Critical`) calculated via:
  $$\text{Priority} = (\text{Upvotes} \times 2) + \text{Age in Days}$$
- **🤖 AI Daily Briefing:** Automated LLM summary generating actionable situational reports.
- **CSV Data Export:** One-click download of filtered reports for audits and external sharing.

---

## 🛠️ Tech Stack

- **Frontend:** React.js /  CSS
- **Backend:**  Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Auth:** JSON Web Tokens (JWT) & bcrypt
- **Integrations:** Gemini/Claude API (AI Briefing), Cloudinary (Image Uploads)

---

## 📡 Key API Routes

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Public | Register new citizen |
| `POST` | `/api/auth/login` | Public | Authenticate user & receive token |
| `POST` | `/api/complaints` | Citizen | Submit a new complaint |
| `GET` | `/api/complaints` | Public / Officer | Fetch all complaints (with filters & priority) |
| `GET` | `/api/complaints/mine` | Citizen | View logged-in user's complaints |
| `PATCH`| `/api/complaints/:id/upvote` | Citizen | Increment upvote count |
| `PATCH`| `/api/complaints/:id/status` | Officer | Update status & add officer remark |
| `PATCH`| `/api/complaints/:id/feedback`| Citizen | Submit resolution feedback |
| `GET` | `/api/complaints/export` | Officer | Export complaint data to CSV |
| `POST` | `/api/ai/officer-summary` | Officer | Generate AI daily executive summary |

---

## 🚀 Quick Setup

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
