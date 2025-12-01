# BitPort - Quick Start (2 Minutes)

## You Already Have These Files Ready!

This is a complete crypto exchange app. Just follow these 3 simple steps:

---

## Step 1: Start Backend (Terminal 1)

```bash
cd backend
npm install
npm start
```

You should see: `Server running on port 5000`

**Backend is working!** ✅

---

## Step 2: Start Frontend (Terminal 2)

```bash
cd frontend
npm install
npm start
```

Browser will open at `http://localhost:3000`

**Frontend is working!** ✅

---

## Step 3: Use It!

1. **Register** - Create account
2. **Login** - Login with your email
3. **Swap** - Convert Bitcoin to Ethereum
4. **History** - See all your swaps
5. **Profile** - View your info

**Done!** 🎉

---

## Before You Start

Make sure you have:
- ✅ Node.js installed (test: `node -v`)
- ✅ MySQL installed and running
- ✅ Database `bitport` created with tables

### Create Database (One Time Only)

Open MySQL and run:

```sql
mysql -u root -p

CREATE DATABASE bitport;
USE bitport;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  from_currency VARCHAR(50) NOT NULL,
  to_currency VARCHAR(50) NOT NULL,
  amount DECIMAL(18, 8) NOT NULL,
  result_amount DECIMAL(18, 8) NOT NULL,
  price DECIMAL(18, 8) NOT NULL,
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## Environment Files

Backend `.env` (in `backend/` folder):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bitport
JWT_SECRET=mysecretkey123
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Frontend `.env` (in `frontend/` folder):
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## What Each Folder Does

```
backend/
├── server.js              ← Main backend file
├── controllers/           ← Login, Register, Swap logic
├── routes/                ← API endpoints (/api/auth, /api/swap)
├── middleware/            ← Checks if user is logged in
└── config/                ← Database connection

frontend/
├── src/pages/            ← Home, Login, Register, Swap, History, Profile pages
├── src/components/       ← Navbar, Footer
├── src/styles/           ← All CSS styling
└── src/utils/            ← API calls, auth helpers
```

---

## That's It!

You have a working crypto exchange app. No advanced stuff. Just:
- React (frontend)
- Node.js + Express (backend)
- SQL + MySQL (database)
- JavaScript

Now read the other guides:
- `SETUP.md` - Detailed setup if something breaks
- `DEPLOYMENT.md` - How to put it online
- `README.md` - Full project info

Happy coding! 🚀
