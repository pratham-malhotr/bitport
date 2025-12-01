# 🚀 Exact Commands to Run BitPort

## The Simple Way (What You Need to Do)

### Terminal 1 - Start Backend

```bash
cd /Users/prathammalhotra/Desktop/cap/backend
npm start
```

**You should see:**
```
Server running on port 5000
```

✅ **Leave this terminal open!**

---

### Terminal 2 - Start Frontend (NEW TERMINAL)

Open a **NEW terminal window** (don't close the first one!)

```bash
cd /Users/prathammalhotra/Desktop/cap/frontend
npm start
```

**You should see:**
```
Compiled with warnings.
```

✅ **Your browser will open automatically!**

---

## What Happens Next

1. Browser opens at: `http://localhost:3000`
2. You see the BitPort website
3. Click "Register" to create account
4. Click "Swap" to trade crypto
5. Click "History" to see swaps

---

## If You Already Have It Running

If you already have both running:

**Backend (Terminal 1):**
- Port 5000 ✅
- Shows: `Server running on port 5000`

**Frontend (Terminal 2):**
- Port 3000 ✅
- Shows: `Compiled with warnings`

Then you're done! Go to `http://localhost:3000` in your browser.

---

## Complete Step-by-Step

### Step 1: Open First Terminal

```bash
cd /Users/prathammalhotra/Desktop/cap/backend
```

Then:

```bash
npm start
```

Wait for:
```
Server running on port 5000
```

✅ **Backend is running!**

### Step 2: Open Second Terminal (Click Terminal → New Window)

```bash
cd /Users/prathammalhotra/Desktop/cap/frontend
```

Then:

```bash
npm start
```

Wait for browser to open or go to: `http://localhost:3000`

✅ **Frontend is running!**

### Step 3: Use Your App!

Go to browser and use the app.

---

## To Stop Everything

In each terminal, press: **Ctrl + C**

---

## To Run Again Tomorrow

**Terminal 1:**
```bash
cd /Users/prathammalhotra/Desktop/cap/backend && npm start
```

**Terminal 2:**
```bash
cd /Users/prathammalhotra/Desktop/cap/frontend && npm start
```

---

## Remember

- **2 terminals needed** (one for backend, one for frontend)
- **Keep both running** (don't close them)
- **Backend on port 5000** (server)
- **Frontend on port 3000** (website)
- **Open browser to http://localhost:3000**

---

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Then try npm start again
```

**Nothing shows?**
- Check both terminals are running
- Wait 10 seconds
- Refresh browser (F5)
- Check browser console (F12)

**Database error?**
- Make sure MySQL is running
- Make sure database `bitport` is created
- Check `.env` file has correct password

---

**That's it! You're ready!** 🎉
