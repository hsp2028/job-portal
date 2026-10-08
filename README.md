# 💼 MERN Job Portal

A full-stack **Job Portal web application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The platform allows job seekers to search and apply for jobs, while recruiters can create companies, post jobs, and manage applications.

## 🚀 Live Demo

* **Frontend:** https://job-portal-eosin-five-39.vercel.app
* **Backend API:** https://job-portal-42a1.onrender.com

---

## 📌 Features

### 👨‍💼 Job Seeker

* User registration and login
* Secure authentication using JWT
* Browse available jobs
* Search jobs by keywords
* Filter jobs based on:

  * Location
  * Job type
  * Salary
  * Experience
* View detailed job information
* Apply for jobs
* View applied jobs
* Update profile
* Upload profile picture
* Manage skills and profile information

### 🏢 Recruiter / Admin

* Recruiter registration and login
* Create and manage companies
* Update company information
* Upload company logo
* Post new jobs
* Edit job postings
* View posted jobs
* View applicants
* Manage job applications
* View candidate profiles

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS
* shadcn/ui
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js
* Multer
* Cloudinary
* Cookie-based authentication

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

---

## 📂 Project Structure

```text
Job-Portal/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── Middleware/
│   ├── utils/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

---

### 2. Backend Setup

Navigate to the backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

SECRET_KEY=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:8000
```

---

### 3. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend

Never commit your backend `.env` file to GitHub.

Required variables include:

```env
PORT=
MONGO_URI=
SECRET_KEY=
CLOUD_NAME=
API_KEY=
API_SECRET=
FRONTEND_URL=
```

### Frontend

```env
VITE_API_URL=
```

For production, `VITE_API_URL` should contain your deployed Render backend URL.

Example:

```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🌐 Deployment

### Frontend — Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Set the **Root Directory** to:

```text
Frontend
```

4. Set the build command:

```bash
npm run build
```

5. Set the output directory:

```text
dist
```

6. Add the environment variable:

```env
VITE_API_URL=https://your-backend.onrender.com
```

7. Deploy the frontend.

### Backend — Render

1. Create a new Web Service on Render.
2. Connect your GitHub repository.
3. Set the **Root Directory** to:

```text
Backend
```

4. Build command:

```bash
npm install
```

5. Start command:

```bash
npm start
```

6. Add all required backend environment variables.
7. Set:

```env
FRONTEND_URL=https://your-frontend.vercel.app
```

8. Deploy the backend.

---

## 🔄 API Endpoints

### User

```text
/api/v1/user/register
/api/v1/user/login
/api/v1/user/logout
/api/v1/user/profile
/api/v1/user/profile/update
```

### Jobs

```text
/api/v1/job/get
/api/v1/job/post
/api/v1/job/getadminjobs
/api/v1/job/get/:id
/api/v1/job/update/:id
```

### Companies

```text
/api/v1/company/register
/api/v1/company/get
/api/v1/company/get/:id
/api/v1/company/update/:id
```

### Applications

```text
/api/v1/application/apply
/api/v1/application/get
/api/v1/application/getapplicants
```

---

## 🔒 Authentication

The application uses **JWT-based authentication** with HTTP cookies.

Authentication flow:

```text
User Login
    ↓
Backend validates credentials
    ↓
JWT Token generated
    ↓
Token stored in cookie
    ↓
Authenticated API requests
    ↓
Protected resources accessed
```

---

## 🔎 Job Search & Filtering

Users can search and filter jobs based on multiple criteria:

```text
Keyword
   │
   ├── Location
   ├── Job Type
   ├── Salary
   └── Experience
```

This makes it easier for job seekers to find relevant opportunities.

---

## 🖥️ Application Workflow

```text
                    JOB PORTAL
                        │
          ┌─────────────┴─────────────┐
          │                           │
      JOB SEEKER                  RECRUITER
          │                           │
     Register/Login              Register/Login
          │                           │
     Browse Jobs                Create Company
          │                           │
     Search/Filter              Post Jobs
          │                           │
     View Job                   Manage Jobs
          │                           │
     Apply                      View Applicants
          │                           │
     Track Applications         Manage Applications
```

---

## 📸 Screenshots

Add screenshots of your application here.

Example:

```text
screenshots/
├── home.png
├── jobs.png
├── job-details.png
├── login.png
├── recruiter-dashboard.png
└── admin-dashboard.png
```

---

## 📈 Future Improvements

Some possible future improvements include:

* Email notifications for applications
* Resume parsing using AI
* AI-based job recommendations
* Advanced recruiter analytics
* Real-time notifications
* Interview scheduling
* Applicant ranking system
* Admin analytics dashboard
* Improved mobile responsiveness

---

## 👨‍💻 Author

**Harshit Singh Parmar**

B.Tech CSE-AIML Student

Interested in:

* Full-Stack Development
* MERN Stack
* Artificial Intelligence & Machine Learning
* Data Structures & Algorithms

---

## ⭐ Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Commit your changes:

```bash
git commit -m "Add new feature"
```

5. Push the branch:

```bash
git push origin feature/new-feature
```

6. Open a Pull Request.

---

## 📄 License

This project is created for educational and portfolio purposes.
