# BitPort - Deployment Guide

Simple guide to deploy BitPort online.

## Table of Contents
1. [Vercel Deployment (Frontend)](#vercel-deployment-frontend)
2. [Render Deployment (Backend)](#render-deployment-backend)
3. [Database Setup](#database-setup)

---

## Vercel Deployment (Frontend)

### What is Vercel?
Vercel is a free website hosting service. It's very easy to use!

### Steps:

1. **Go to Vercel Website**
   - Visit: https://vercel.com
   - Click "Sign Up"
   - Sign up with your GitHub account (easiest way)

2. **Connect Your GitHub Repo**
   - After signing up, click "Add New" → "Project"
   - Find and select your `bitport` repository
   - Click "Import"

3. **Configure Your Frontend**
   - In "Root Directory", select `frontend`
   - Vercel will auto-detect everything else
   - Click "Deploy"
   - Wait 2-3 minutes for it to deploy

4. **Add Environment Variable**
   - Go to Settings → Environment Variables
   - Add new variable:
     - Name: `REACT_APP_API_URL`
     - Value: `https://your-backend-url/api` (you'll get this from Render)
   - Click "Save"

5. **Your Frontend is Live!**
   - You'll get a URL like: `https://bitport.vercel.app`
   - Your app is now online! 🎉

---

---

## Render Deployment (Backend)

### What is Render?
Render is a free server hosting service. It runs your backend code 24/7.

### Steps:

1. **Go to Render Website**
   - Visit: https://render.com
   - Click "Get Started"
   - Sign up with your GitHub account

2. **Create a New Service**
   - Click "New +" button
   - Click "Web Service"
   - Select your GitHub repository `bitport`
   - Click "Connect"

3. **Fill in the Details**
   - Name: `bitport-backend`
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Click "Create Web Service"

4. **Wait for Deployment**
   - Render will automatically build and start your backend
   - Wait 3-5 minutes
   - You'll get a URL like: `https://bitport-backend.onrender.com`

5. **Add Environment Variables**
   - Go to Settings tab
   - Scroll to "Environment Variables"
   - Add these variables:
   
   ```
   DB_HOST = your_database_host
   DB_USER = your_database_user
   DB_PASSWORD = your_database_password
   DB_NAME = bitport
   JWT_SECRET = any_random_text_here_123456789
   PORT = 5000
   NODE_ENV = production
   FRONTEND_URL = https://bitport.vercel.app
   ```

6. **Redeploy**
   - After adding variables, go to "Deploys" tab
   - Click the three dots → "Redeploy"
   - Wait for it to finish

---

## Database Setup

### Easy Option: Use Railway (Recommended for Beginners)

Railway is the easiest - they have a free MySQL service!

1. **Go to Railway**
   - Visit: https://railway.app
   - Click "Start a New Project"
   - Sign up with GitHub

2. **Create MySQL Database**
   - Click "Create"
   - Choose "MySQL"
   - Railway will set it up automatically
   - Click on "MySQL" to see your credentials

3. **Get Connection Details**
   - You'll see:
     - `Host`
     - `Port`
     - `User`
     - `Password`
     - `Database`
   - Copy these and save them

4. **Create Tables**
   - In your computer terminal, run:
   ```bash
   mysql -h <host> -P <port> -u <user> -p<password> < backend/config/schema.sql
   ```
   - Replace `<host>`, `<port>`, `<user>`, `<password>` with values from Railway
   - When asked for password, just press Enter (you already provided it)

5. **Update Render Environment Variables**
   - Go to your Render backend service
   - Add these variables with Railway values:
     - `DB_HOST` = Railway Host
     - `DB_USER` = Railway User
     - `DB_PASSWORD` = Railway Password
     - `DB_NAME` = Railway Database

### Other Options

**PlanetScale (MySQL):**
- Visit: https://planetscale.com
- Create free MySQL database
- Copy connection details

**AWS RDS:**
- Visit: https://aws.amazon.com/rds
- Create MySQL instance
- Can be paid, but has free tier

---

## Summary: What You'll Have After Following This

After following these steps:

1. **Frontend will be at:** https://bitport.vercel.app (YOUR URL WILL BE DIFFERENT)
2. **Backend will be at:** https://bitport-backend.onrender.com (YOUR URL WILL BE DIFFERENT)
3. **Database will be at:** Railway MySQL

Anyone can visit your website!

---

## Testing Your App

1. Go to your Vercel URL in browser
2. Click "Register" and create an account
3. Login with your account
4. Go to "Swap" and try swapping Bitcoin to Ethereum
5. Check "History" to see your swap
6. Everything should work!

---

## If Something Goes Wrong

### Backend not starting on Render?
- Go to Render Dashboard
- Click on your service
- Go to "Logs" tab
- Read the error message
- Usually it's a database connection problem

### Frontend can't connect to backend?
- Check that `REACT_APP_API_URL` is correct in Vercel
- Make sure backend URL is https://... (not http)
- Wait 5 minutes for changes to take effect

### Database connection error?
- Check all database credentials are correct
- Make sure MySQL is running
- Try connecting from your computer:
  ```bash
  mysql -h <host> -u <user> -p<password>
  ```

---

## Support

If you have problems:
1. Read the error message carefully
2. Check the logs on Render or Vercel
3. Google the error message
4. Ask in GitHub issues
