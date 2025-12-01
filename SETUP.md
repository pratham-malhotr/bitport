# BitPort - Setup Guide

## Quick Start

### Prerequisites
- Node.js (v14+)
- MySQL (v5.7+)
- Git

---

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bitport
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. Create MySQL Database and Tables
```bash
mysql -u root -p < config/schema.sql
```

Or manually create the database:
```sql
mysql -u root -p

CREATE DATABASE bitport;
USE bitport;

-- Then paste the content from config/schema.sql
```

### 5. Start Backend Server
```bash
npm start
```
or with auto-reload:
```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

---

## Frontend Setup

### 1. Navigate to Frontend Directory (New Terminal)
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start Frontend Dev Server
```bash
npm start
```

Frontend will run on: `http://localhost:3000`

---

## Testing the Application

### 1. Register a New User
- Go to `http://localhost:3000/register`
- Fill in the form and submit

### 2. Login
- Go to `http://localhost:3000/login`
- Enter your credentials

### 3. Make a Swap
- Go to `http://localhost:3000/swap`
- Select currencies and amount
- Click "Swap Now"

### 4. View History
- Go to `http://localhost:3000/history`
- Search, filter, and sort transactions
- Delete transactions if needed

### 5. View Profile
- Go to `http://localhost:3000/profile`
- See your account information

---

## API Testing with Curl

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Profile (Replace TOKEN with actual token from login)
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### Create Swap
```bash
curl -X POST http://localhost:5000/api/swap/swap \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "fromCurrency": "bitcoin",
    "toCurrency": "ethereum",
    "amount": 1
  }'
```

### Get Transaction History
```bash
curl -X GET "http://localhost:5000/api/swap/history?page=1&limit=10&sort=created_at&order=DESC" \
  -H "Authorization: Bearer TOKEN"
```

---

## Troubleshooting

### Port Already in Use
**Backend (Port 5000):**
```bash
lsof -i :5000
kill -9 <PID>
```

**Frontend (Port 3000):**
```bash
lsof -i :3000
kill -9 <PID>
```

### MySQL Connection Error
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `.env` file
- Ensure database `bitport` exists

### Frontend can't connect to backend
- Check if backend is running on port 5000
- Verify `REACT_APP_API_URL` in frontend `.env`
- Check CORS settings in `backend/server.js`
- Check browser console for detailed errors

### Dependencies Installation Error
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Database Schema

The database is created automatically when you run:
```bash
mysql -u root -p < config/schema.sql
```

**Tables Created:**
- `users` - Stores user accounts
- `transactions` - Stores crypto swap transactions

---

## Project Structure

```
bitport/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── schema.sql
│   ├── controllers/
│   │   ├── authController.js
│   │   └── swapController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── swapRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Swap.js
│   │   │   ├── History.js
│   │   │   └── Profile.js
│   │   ├── styles/
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.css
│   │   │   └── pages.css
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── ProtectedRoute.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
├── .gitignore
└── README.md
```

---

## Next Steps for Production

1. **Deploy Frontend to Vercel**
   - Push code to GitHub
   - Connect repository to Vercel
   - Set environment variables

2. **Deploy Backend to Render**
   - Push code to GitHub
   - Create new Web Service on Render
   - Configure environment variables and database

3. **Set up MySQL Database**
   - Use AWS RDS, PlanetScale, or Railway
   - Update `DB_HOST`, `DB_USER`, `DB_PASSWORD` in production `.env`

---

## Support

For issues or questions, check the main README.md or open an issue on GitHub.
