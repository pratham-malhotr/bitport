# BitPort - Crypto Exchange Platform

A full-stack cryptocurrency exchange platform built with React.js, Node.js, Express.js, and MySQL. Swap cryptocurrencies at real-time prices with secure JWT authentication.

## 🚀 Features

- **User Authentication**: Register & Login with JWT tokens and bcrypt password hashing
- **Real-Time Crypto Prices**: Live prices from CoinGecko API
- **Secure Crypto Swaps**: Exchange cryptocurrencies with calculated rates
- **Transaction History**: Complete CRUD operations on swap history
- **Search & Filter**: Search transactions by currency with pagination
- **Protected Routes**: Only logged-in users can access swap and history pages
- **Responsive Design**: Mobile-friendly UI built with pure CSS
- **User Profile**: View account information and statistics

## 📁 Project Structure

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
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── styles/
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── ProtectedRoute.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── .gitignore
└── README.md
```

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Axios** - HTTP client

### Frontend
- **React.js** - UI library
- **React Router** - Routing
- **Axios** - API calls
- **CSS3** - Styling (no UI libraries)

### Database
- **MySQL** - Relational database

### APIs
- **CoinGecko** - Cryptocurrency prices (free, no auth required)

## 📋 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions Table
```sql
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

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Swap & History
- `POST /api/swap/swap` - Create a new swap (protected)
- `GET /api/swap/history` - Get user's transaction history (protected)
- `GET /api/swap/:id` - Get transaction by ID (protected)
- `PUT /api/swap/:id` - Update transaction status (protected)
- `DELETE /api/swap/:id` - Delete transaction (protected)
- `GET /api/swap/search` - Search transactions by currency (protected)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL (v5.7 or higher)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create and configure `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bitport
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. Create MySQL database and tables:
```bash
mysql -u root -p < config/schema.sql
```

5. Start the backend server:
```bash
npm start
# or with auto-reload during development
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📝 Pages

- **Home** (`/`) - Landing page with features and statistics
- **Register** (`/register`) - User registration form
- **Login** (`/login`) - User login form
- **Swap** (`/swap`) - Cryptocurrency swap interface (protected)
- **History** (`/history`) - Transaction history with search and filtering (protected)
- **Profile** (`/profile`) - User profile information (protected)

## 🔐 Security Features

- JWT-based authentication with 7-day expiration
- Password hashing with bcryptjs (10 salt rounds)
- Protected API routes with middleware
- SQL injection prevention
- CORS enabled for frontend

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and select your repository
4. Set environment variable:
   - `REACT_APP_API_URL` = Your backend URL (e.g., `https://bitport-backend.onrender.com/api`)
5. Click "Deploy"

### Backend Deployment (Render)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     ```
     DB_HOST=your_mysql_host
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=bitport
     JWT_SECRET=generate_a_strong_secret_key
     PORT=5000
     NODE_ENV=production
     FRONTEND_URL=https://your-vercel-app.vercel.app
     ```
6. Click "Create Web Service"

## 🗄️ Database Hosting (for production)

Consider using:
- **AWS RDS** - Amazon Relational Database Service
- **PlanetScale** - MySQL hosting (free tier available)
- **Railway** - Simple database hosting
- **Supabase** - PostgreSQL alternative

## 📊 Usage Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Swap
```bash
curl -X POST http://localhost:5000/api/swap/swap \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"fromCurrency":"bitcoin","toCurrency":"ethereum","amount":1}'
```

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify MySQL is running and credentials are correct
- Check `.env` file configuration

### Frontend can't connect to backend
- Ensure backend is running on the correct port
- Check `REACT_APP_API_URL` in frontend `.env`
- Check CORS settings in backend

### Database errors
- Verify MySQL is installed and running
- Run schema.sql to create tables
- Check database user permissions

## 📚 Supported Cryptocurrencies

The platform supports 50+ cryptocurrencies including:
- Bitcoin (bitcoin)
- Ethereum (ethereum)
- Litecoin (litecoin)
- Ripple (ripple)
- Cardano (cardano)
- And many more from CoinGecko API

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- [ ] Two-factor authentication
- [ ] Email verification
- [ ] Advanced charting with TradingView
- [ ] WebSocket for real-time price updates
- [ ] Multiple currency pairs support
- [ ] Transaction notifications
- [ ] API rate limiting
- [ ] Admin dashboard

## 📞 Support

For issues and questions, please open an GitHub issue.

## 🙏 Acknowledgments

- CoinGecko API for cryptocurrency data
- React.js community
- Express.js documentation

---

**Happy Trading! 🚀**
