# BattleByte 🎮

BattleByte is a fullstack Esports gaming, tournament management, and gaming merchandise platform.

## 🚀 Live Backend API
The backend is deployed and running at:
**`https://battlebyte.130-210-12-68.sslip.io`**

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Axios, React Router, CSS3
- **Backend**: Node.js, Express.js, PostgreSQL (`pg` pool), JWT, Multer
- **Database**: PostgreSQL (Relational schema with cascade delete & constraints)

---

## 📁 Project Structure

```text
BattleByte/
├── Backend/
│   ├── config/         # PostgreSQL database pool configuration
│   ├── controllers/    # API endpoint controllers
│   ├── middleware/     # Auth and upload middlewares
│   ├── models/         # Database query models
│   ├── routes/         # Express API route declarations
│   ├── scripts/        # Database initialization & migrations (initDB.js)
│   ├── src/uploads/    # Media and image uploads
│   ├── schema.sql      # Complete PostgreSQL relational schema (26 tables)
│   └── server.js       # Express server entry point
├── frontend/
│   ├── src/            # React components, pages, and styles
│   ├── public/         # Static assets
│   ├── .env            # Frontend environment (VITE_API_URL)
│   ├── .env.example    # Environment template
│   └── package.json    # Frontend dependencies and scripts
└── README.md
```

---

## ⚡ Quick Start

### 1. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173` and automatically fetch data from `https://battlebyte.130-210-12-68.sslip.io`.

### 2. Backend Setup (Local / Self-hosted)

```bash
cd Backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials or DATABASE_URL

# Initialize database schema
npm run init-db

# Start server
npm start
# Or start with nodemon for development
npm run dev
```

---

## 🔑 Environment Variables

### Frontend (`frontend/.env`)
```env
VITE_API_URL=https://battlebyte.130-210-12-68.sslip.io
```

### Backend (`Backend/.env`)
```env
PORT=8080
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
# Or individual credentials:
DB_USER=postgres
DB_HOST=localhost
DB_NAME=battlebyte
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret
ADMIN_SECRET_KEY=your_admin_secret_key
```
