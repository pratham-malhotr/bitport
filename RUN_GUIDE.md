# 🚀 HOW TO RUN BitPort - Step by Step

**Total time: 5 minutes**

---

## ⚠️ BEFORE YOU START

Make sure you have:

### 1. Node.js Installed
```bash
node -v
```
Should show version like `v18.0.0`

If not, download from: https://nodejs.org/

### 2. MySQL Installed and Running
```bash
mysql -u root -p
```
Should ask for password, then show `mysql>`

If not, download from: https://dev.mysql.com/downloads/mysql/

### 3. Git Installed
```bash
git -v
```
Should show version

---

## 📋 STEP 1: Create Database (One Time Only!)

Open a terminal and type:

```bash
mysql -u root -p
```

Enter your MySQL password.

Then copy-paste this entire block:

```sql
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

Type `exit` to quit MySQL.

✅ **Database created!**

---

## 🔧 STEP 2: Setup Backend

Open Terminal and navigate to the project:

```bash
cd /Users/prathammalhotra/Desktop/cap
```

Go to backend folder:

```bash
cd backend
```

Install packages:

```bash
npm install
```

This will take 1-2 minutes. Wait for it to finish.

### Create `.env` File

In the `backend` folder, create a new file called `.env`

Add this content:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=bitport
JWT_SECRET=mysecretkey123456789
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL password!**

### Start Backend Server

Type:

```bash
npm start
```

You should see:

```
Server running on port 5000
```

✅ **Backend is running!** Keep this terminal open.

---

## 🎨 STEP 3: Setup Frontend

**Open a NEW terminal** (don't close the backend terminal!)

Navigate to the project:

```bash
cd /Users/prathammalhotra/Desktop/cap
```

Go to frontend folder:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

This will take 2-3 minutes. Wait for it to finish.

### Create `.env` File

In the `frontend` folder, create a new file called `.env`

Add this content:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### Start Frontend Server

Type:

```bash
npm start
```

A browser window will automatically open to `http://localhost:3000`

✅ **Frontend is running!**

---

## ✨ STEP 4: Test Your App!

The website is now open in your browser!

### Register Account
1. Click "Register"
2. Enter your name
3. Enter your email
4. Enter password (twice)
5. Click "Register"

### Login
1. Click "Login" 
2. Enter your email
3. Enter password
4. Click "Login"

### Make a Swap
1. Click "Swap"
2. Select "From Currency" (like Bitcoin)
3. Select "To Currency" (like Ethereum)
4. Enter an amount (like 1)
5. Click "Swap Now"

### View History
1. Click "History"
2. See your swap in the table!
3. You can delete it if you want

### View Profile
1. Click "Profile"
2. See your account info

✅ **Everything works!**

---

## 🛑 STOP/RESTART

### To Stop

In each terminal, press: `Ctrl + C`

### To Start Again

**Terminal 1 (Backend):**
```bash
cd /Users/prathammalhotra/Desktop/cap/backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd /Users/prathammalhotra/Desktop/cap/frontend
npm start
```

---

## ❌ Common Problems

### "Port 5000 already in use"
```bash
# Kill the process
lsof -i :5000
kill -9 <PID>

# Then restart backend
npm start
```

### "Cannot find module"
```bash
# Reinstall packages
npm install
```

### "MySQL connection error"
- Check password in `.env` is correct
- Make sure MySQL is running
- Make sure database `bitport` was created

### "Can't connect to database"
```bash
# Check MySQL is running
mysql -u root -p
```

### "Frontend shows error"
- Open browser DevTools (F12)
- Check Console tab for error messages
- Check that backend is running on port 5000

---

## 📂 Files You Created

- `backend/.env` - Your MySQL credentials
- `frontend/.env` - Backend API URL

**Keep these `.env` files secret! Never push to GitHub!**

---

## 🎯 That's It!

You now have a working crypto exchange app running locally!

Next steps:
- **Explore the code** - Read the files in `backend/` and `frontend/src/`
- **Make changes** - Try modifying code and see what happens
- **Deploy online** - Read `DEPLOYMENT.md` when ready

---

**Happy coding!** 🚀

Questions? Check the error message. Google it. Read the code. That's what developers do!
