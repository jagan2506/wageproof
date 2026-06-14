**WageProof**

**WageProof is a full-stack web application designed to provide transparent wage tracking for **daily wage workers and employers. The platform enables workers to check in and check out using GPS location, track payments, and raise disputes, while employers can create jobs, monitor work logs, and manage payments.

Features
Authentication
User Registration
User Login
JWT Authentication
Role-Based Access Control (Worker / Employer)
Worker Features
View Available Jobs
GPS-Based Check-In
GPS-Based Check-Out
Track Days Worked
View Earnings Summary
View Work History
Raise Payment Disputes
Employer Features
Create Jobs
Set Daily Wage
Use Current GPS Location
View Worker Logs
Mark Payments as Paid
Monitor Worker Activity
Dashboard Statistics
Total Days Worked
Total Earnings
Pending Payments
Payment Status Tracking
Tech Stack
Frontend
React.js
React Router DOM
Axios
CSS
Backend
Node.js
Express.js
JWT Authentication
REST API
Database
MongoDB Atlas
Mongoose
Deployment
Frontend: Vercel
Backend: Render
Project Structure
wageproof/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── styles/
│   │   └── api/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
Installation
Clone Repository
git clone https://github.com/jagan2506/wageproof.git
cd wageproof
Backend Setup
cd backend
npm install
npm run dev

Create a .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Frontend Setup
cd frontend
npm install
npm run dev
API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Jobs
GET /api/jobs
POST /api/jobs
Work Logs
POST /api/worklogs/checkin
PUT /api/worklogs/:id/checkout
GET /api/worklogs/mylogs
GET /api/worklogs/summary/:workerId
PUT /api/worklogs/:id/payment
PUT /api/worklogs/:id/dispute
GET /api/worklogs/all
Screenshots
Login Page

(Add Screenshot)

Worker Dashboard

(Add Screenshot)

Employer Dashboard

(Add Screenshot)

Work Logs

(Add Screenshot)

Payment Management

(Add Screenshot)

Future Enhancements
Attendance Analytics
Payroll Reports
Email Notifications
Salary Export (PDF/Excel)
Admin Dashboard
Real-Time Location Tracking
Author

Jagan Raj

GitHub:
https://github.com/jagan2506

License

This project is developed for educational and portfolio purposes.
