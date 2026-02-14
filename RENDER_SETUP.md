# Render Deployment Setup Guide

## 🚨 Critical Fix for 500 Error

Your deployed app is getting a 500 error because of **missing/incorrect environment variables** on Render.

## ✅ Required Steps

### 1. Fix MongoDB Connection String

Your current MongoDB URI is missing the database name. It should be:

```
mongodb+srv://mehak24_db_user:mehak15@organicwebsite.jfcdjaq.mongodb.net/organicshop?retryWrites=true&w=majority&appName=organicwebsite
```

### 2. MongoDB Atlas - Allow Render IP Access

1. Go to **MongoDB Atlas** → **Network Access**
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Or add Render's specific IPs if you want to be more secure
4. Click **Confirm**

### 3. Set Environment Variables on Render Dashboard

Go to your **Render Dashboard** → **organic-shop-backend** → **Environment**

Add these environment variables:

#### Required Variables:

```bash
NODE_ENV=production

MONGODB_URI=mongodb+srv://mehak24_db_user:mehak15@organicwebsite.jfcdjaq.mongodb.net/organicshop?retryWrites=true&w=majority&appName=organicwebsite

JWT_SECRET=e50568bd74cf3f7ca03b8ece82a52009b81800a0c3b8e1d32defd0a0b9a29757

JWT_EXPIRE=7d

JWT_COOKIE_EXPIRE=7

FRONTEND_URL=https://your-frontend-name.onrender.com
```

**Note:** Replace `your-frontend-name` with your actual frontend Render URL

#### Optional (for Google OAuth - if you're using it):

```bash
GOOGLE_CLIENT_ID=1025374897425-j1j0jacibo9ipofri68etscsj9df40sr.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET=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

GOOGLE_CALLBACK_URL=https://organic-ecommerce-yr0g.onrender.com/api/auth/google/callback
```

### 4. Update Frontend API URL

In your frontend `.env` or `vite.config.js`, set:

```bash
VITE_API_URL=https://organic-ecommerce-yr0g.onrender.com
```

### 5. Redeploy Backend

After setting all environment variables:
1. Go to Render Dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait for deployment to complete

### 6. Check Logs

After deployment:
1. Go to **Render Dashboard** → **Logs**
2. Look for:
   - ✅ MongoDB Connected
   - 🚀 Server is running on port 5000
3. If you see errors:
   - Check MongoDB connection string
   - Verify MongoDB Atlas IP whitelist
   - Ensure all environment variables are set

## 🔍 Testing

After deployment, test:

1. **Health Check:**
   ```
   https://organic-ecommerce-yr0g.onrender.com/api/health
   ```
   Should return: `{"status":"OK","message":"Server is healthy"}`

2. **Registration:**
   Try registering a new user with a **new email address**

## Common Issues

### Issue: 500 Error on Registration
**Cause:** MongoDB connection failed or environment variables missing
**Fix:** Check logs, verify MongoDB URI and IP whitelist

### Issue: CORS Error
**Cause:** FRONTEND_URL not set correctly
**Fix:** Set FRONTEND_URL to your exact frontend Render URL

### Issue: JWT Error
**Cause:** JWT_SECRET not set
**Fix:** Add JWT_SECRET in Render environment variables

## 📝 Notes

- Free tier Render services spin down after inactivity
- First request after inactivity may take 30-60 seconds
- Always use HTTPS URLs for production (Render provides this automatically)
