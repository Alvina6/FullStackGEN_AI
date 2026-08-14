# 🚀 CareerAI - AI-Powered Interview Preparation Platform

**Transform your interview preparation with AI-driven insights, personalized strategies, and targeted skill development.**

![CareerAI](https://img.shields.io/badge/Status-In%20Development-blue?style=flat-square)
![License](https://img.shields.io/badge/License-ISC-green?style=flat-square)
![Node](https://img.shields.io/badge/Node-v18%2B-brightgreen?style=flat-square)
![React](https://img.shields.io/badge/React-19.2.7-blue?style=flat-square)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Intelligent Interview Analysis

- **AI-Powered Resume Analysis**: Parses your resume and extracts key competencies
- **Job Description Matching**: Analyzes target job requirements against your profile
- **Match Score**: Get an immediate compatibility score (0-100%) for the position

### 🎓 Personalized Interview Prep

- **Technical Questions**: AI-generated technical questions tailored to the job role
  - Includes question intent and sample answers
- **Behavioral Questions**: Customized behavioral questions with strategic guidance
- **Skill Gap Identification**: Automatic detection of critical skill gaps
  - Prioritized by severity (High/Medium/Low)

### 📅 Preparation Roadmap

- **Day-by-Day Plan**: Structured 30-day interview preparation timeline
- **Actionable Tasks**: Specific daily tasks and focus areas
- **Progress Tracking**: Monitor your preparation journey

### 📄 Resume Optimization

- **AI-Generated Resume PDF**: Get an optimized resume tailored to the job
- **ATS Optimization**: Automatically formatted for Applicant Tracking Systems
- **Keyword Integration**: Strategic incorporation of job description keywords

### 👤 User Management

- **Secure Authentication**: JWT-based authentication with password hashing (bcrypt)
- **Session Management**: Persistent login with secure cookies
- **User Profiles**: Track interview preparation history

---

## 🛠 Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.8.0
- **AI Engine**: Google GenAI API
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Security**: bcrypt 6.0.0
- **File Processing**:
  - pdf-parse 2.4.5 (PDF extraction)
  - multer 2.2.0 (File uploads)
  - puppeteer 25.6.0 (PDF generation)
- **Validation**: Zod 4.4.3
- **CORS**: Enabled for cross-origin requests
- **Environment**: dotenv 17.4.2

### Frontend

- **UI Library**: React 19.2.7
- **Build Tool**: Vite 8.1.1
- **Routing**: React Router v8.3.0
- **HTTP Client**: Axios 1.18.1
- **Styling**: SASS (Embedded 1.100.0)
- **Linting**: ESLint 10.6.0

### Development Tools

- **Version Control**: Git
- **Package Manager**: npm

---

## 📁 Project Structure

```
full_stack_genAI/
├── Backend/
│   ├── server.js                      # Entry point
│   ├── package.json
│   ├── .env                          # Environment variables
│   └── src/
│       ├── app.js                    # Express app setup
│       ├── config/
│       │   └── database.js           # MongoDB connection
│       ├── controllers/
│       │   ├── auth.controller.js    # Auth logic
│       │   └── interview.controller.js # Interview report generation
│       ├── middlewares/
│       │   ├── auth.middleware.js    # JWT verification
│       │   └── file.middleware.js    # File upload handling
│       ├── models/
│       │   ├── user.model.js
│       │   ├── interviewReport.model.js
│       │   └── blacklist.model.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   └── interview.routes.js
│       └── services/
│           └── ai.service.js         # Google GenAI integration
│
├── Frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── app.routes.jsx            # Route definitions
│       ├── style.scss
│       └── features/
│           ├── auth/
│           │   ├── auth.context.jsx
│           │   ├── auth.form.scss
│           │   ├── components/
│           │   │   └── Protected.jsx # Protected route wrapper
│           │   ├── hooks/
│           │   │   └── useAuth.js
│           │   ├── pages/
│           │   │   ├── Login.jsx
│           │   │   └── Register.jsx
│           │   └── services/
│           │       └── auth.api.js
│           └── interview/
│               ├── interview.context.jsx
│               ├── hooks/
│               │   └── useInterview.js
│               ├── pages/
│               │   ├── home.jsx      # Dashboard
│               │   └── Interview.jsx # Interview prep page
│               ├── services/
│               │   └── interview.api.js
│               └── styles/
│                   ├── home.scss
│                   └── interview.scss
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v8 or higher
- **MongoDB** (local or cloud instance)
- **Google GenAI API Key** (free tier available)

### Clone the Repository

```bash
git clone <repository-url>
cd full_stack_genAI
```

---

## 📦 Installation

### Backend Setup

```bash
cd Backend
npm install
```

### Frontend Setup

```bash
cd ../Frontend
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `Backend` directory:

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Authentication
JWT_SECRET=your_secret_key_here

# Google GenAI
GOOGLE_GENAI_API_KEY=your_google_genai_api_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend Configuration

The frontend automatically connects to `http://localhost:5000` for API calls. Update this in `src/features/auth/services/auth.api.js` if needed:

```javascript
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
```

---

## 🏃 Running the Application

### Terminal 1: Start Backend Server

```bash
cd Backend
npm start
# Server runs on http://localhost:5000
```

### Terminal 2: Start Frontend Development Server

```bash
cd Frontend
npm run dev
# Frontend runs on http://localhost:5173
```

### Build for Production

```bash
# Backend (already production-ready)
cd Backend
npm start

# Frontend
cd Frontend
npm run build
npm run preview  # Preview production build
```

---

## 📚 API Documentation

### Authentication Routes

**Base URL**: `http://localhost:5000/api/auth`

#### Register

```http
POST /register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

#### Login

```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

#### Get Current User

```http
GET /get-me
Authorization: Bearer <jwt_token>
```

#### Logout

```http
GET /logout
Authorization: Bearer <jwt_token>
```

### Interview Routes

**Base URL**: `http://localhost:5000/api/interview`

#### Generate Interview Report

```http
POST /generate
Content-Type: multipart/form-data
Authorization: Bearer <jwt_token>

Form Data:
- jobDescription: "Job description text..."
- selfDescription: "Your profile summary..." (optional if resume provided)
- resumeFile: <PDF file> (required)
```

**Response**:

```json
{
  "_id": "60d5ec49c1234567890abcde",
  "matchScore": 75,
  "technicalQuestions": [
    {
      "question": "...",
      "intention": "...",
      "answer": "..."
    }
  ],
  "behavioralQuestions": [...],
  "skillGaps": [
    {
      "skill": "React",
      "severity": "high"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Foundation Review",
      "tasks": ["Task 1", "Task 2"]
    }
  ]
}
```

---

## 🏗 Architecture

### Data Flow

```
User (Frontend)
    ↓
React Router (Navigation)
    ↓
Auth Context (Session Management)
    ↓
API Layer (Axios)
    ↓
Express Middleware (Auth Verification)
    ↓
Controllers (Business Logic)
    ↓
AI Service (Google GenAI)
    ↓
MongoDB (Data Persistence)
    ↓
Response (JSON)
```

### Authentication Flow

```
Login → JWT Generated → Stored in Cookies →
Verified on Protected Routes → Access Granted
```

### Interview Generation Flow

```
Resume (PDF) → Parse Text →
Job Description + Resume Text →
Google GenAI Analysis →
Generate Questions + Gaps + Plan →
Save to MongoDB →
Display to User
```

---

## 🔐 Security Features

- ✅ **Password Hashing**: bcrypt with salt rounds
- ✅ **JWT Authentication**: Secure token-based auth
- ✅ **CORS Protection**: Restricted to frontend origin
- ✅ **Protected Routes**: Middleware-based access control
- ✅ **Token Blacklisting**: Logout functionality
- ✅ **Input Validation**: Zod schema validation
- ✅ **Secure Cookies**: HTTP-only, Secure flags

---

## 🚦 Current Status

- ✅ Authentication System
- ✅ Interview Report Generation
- ✅ AI-Powered Analysis
- ✅ PDF Resume Parsing
- 🔄 Resume PDF Generation (In Progress)
- 🔄 Previous Reports History
- 🔄 Interview Performance Tracking

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 💬 Support & Feedback

Have questions or suggestions? Feel free to open an issue or reach out!

- **Issues**: [GitHub Issues](https://github.com/yourusername/full_stack_genAI/issues)
- **Email**: support@careerai.com

---

## 🙏 Acknowledgments

- Google GenAI for powerful AI capabilities
- MongoDB for flexible data storage
- React & Vite for modern frontend development
- Express.js community for robust backend framework

---

**Happy interview prep! 🎉 Land your dream job with CareerAI!**
