# 🚀 CareerBoost

**AI-Powered Resume Analysis Platform**

ResumeUp.AI is a full-stack web application that allows users to upload their resumes and receive **AI-driven insights, skill improvement suggestions, and career recommendations**.
The project is built using the **MERN stack** with secure authentication and cloud-based file handling.

---

## ✨ Features

* 🔐 Secure User Authentication (JWT)
* 📄 Resume Upload (PDF format)
* ☁️ Cloud-based Resume Storage
* 🤖 AI-Based Resume Analysis
* 📊 Personal Dashboard
* 🧠 Skill Gap Identification
* 📝 Personalized Recommendations
* ⚡ Fast & Scalable Architecture

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Multer (File Upload)
* Cloudinary (PDF Storage)
* AI API Integration

---

## 📂 Project Structure

```
ResumeUp.AI/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── models/
│
├── .gitignore
├── README.md
└── .env.example
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

AI_API_KEY=your_ai_api_key
```

> ⚠️ Do not commit the `.env` file to GitHub.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ResumeUp.AI.git
cd ResumeUp.AI
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔄 API Overview

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| POST   | `/api/analyze-resume` | Upload & analyze resume |
| GET    | `/api/analyses`       | Fetch user analyses     |
| GET    | `/api/analysis/:id`   | Fetch analysis by ID    |

---

## 📌 Usage

1. Register or log in
2. Upload a resume in PDF format
3. Receive AI-generated insights
4. View analysis history in the dashboard

---

## 🌱 Future Enhancements

* ATS Score Evaluation
* Job Description Matching
* Resume Improvement Suggestions
* LinkedIn Profile Analysis

---

## 👩‍💻 Author

**Niharika Goel**
B.Tech (AI & ML) | Full Stack Developer

🔗 GitHub: [https://github.com/NiharikaGoel02](https://github.com/NiharikaGoel02)

---

## ⭐ Support

If you find this project helpful, feel free to give it a ⭐ on GitHub.

---

