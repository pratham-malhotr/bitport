# BitPort - How to Run Locally

Easy setup guide! You need Node.js and MySQL installed.

## Prerequisites
- Node.js (download from https://nodejs.org)
- MySQL (download from https://dev.mysql.com/downloads/mysql/)

---

## Step 1: Setup Backend

### Open Terminal and go to backend folder
```bash
cd backend
```

### Install packages
```bash
npm install
```

### Create `.env` file in backend folder
Create a new file called `.env` with this content:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=bitport
JWT_SECRET=mysecretkey123
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Replace `your_mysql_password` with your actual MySQL password.

### Create the database
Open your MySQL terminal and run:
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

### Start Backend Server
```bash
npm start
```

You should see: `Server running on port 5000`

---

## Step 2: Setup Frontend (New Terminal)

### Open a NEW terminal and go to frontend folder
```bash
cd frontend
```

### Install packages
```bash
npm install
```

### Create `.env` file in frontend folder
Create a new file called `.env` with this:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Start Frontend
```bash
npm start
```

It will open automatically in your browser at `http://localhost:3000`

---

## Now Test It!

### 1. Register
- Click "Register"
- Fill in your name, email, password
- Click "Register"

### 2. Login
- Click "Login"
- Use your email and password
- Click "Login"

### 3. Swap
- Click "Swap"
- Select two currencies (like Bitcoin → Ethereum)
- Enter amount
- Click "Swap Now"

### 4. View History
- Click "History"
- See all your swaps
- You can delete them

### 5. Profile
- Click "Profile"
- See your information

---

## If Something Breaks

**Port 5000 or 3000 already in use?**
- Close other apps using those ports
- Or change PORT in backend/.env

**MySQL not running?**
- Start MySQL service

**Can't connect to database?**
- Check your password in `.env` is correct
- Make sure MySQL is running
- Make sure database `bitport` exists

**Frontend shows error?**
- Check backend is running on port 5000
- Check browser console (F12) for errors
- Restart npm start

---

## How to Push Changes to GitHub

```bash
git add .
git commit -m "Your message here"
git push origin main
```

---

## Files Explained

- `backend/server.js` - Main backend file
- `backend/controllers/` - Login, signup, swap logic
- `backend/routes/` - API endpoints
- `frontend/src/pages/` - Home, Login, Register, Swap, History, Profile pages
- `frontend/src/styles/` - CSS for all pages
- `frontend/src/utils/api.js` - Connects frontend to backend

---

## Support

Check the errors in the terminal. Google the error message. That's how real developers work!
