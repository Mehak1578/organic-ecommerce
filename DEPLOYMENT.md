# 🚀 Deployment Guide for OrganicShop

## Quick Deployment Checklist

### ✅ Pre-Deployment Setup (Complete)
- [x] Git repository initialized
- [x] All files committed
- [x] `.gitignore` configured
- [x] `.env.example` files created
- [x] README.md updated with deployment instructions
- [x] `render.yaml` configuration created

### 📋 Next Steps

## 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and login
2. Click the **"+"** icon (top right) → **"New repository"**
3. Repository settings:
   - **Repository name**: `organic-shop` (or your preferred name)
   - **Description**: "MERN stack e-commerce platform for organic products with dark mode"
   - **Visibility**: Public or Private (your choice)
   - ⚠️ **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**
5. Copy the repository URL (it will look like: `https://github.com/your-username/organic-shop.git`)

## 2. Push to GitHub

Open terminal and run these commands from your project directory:

```bash
# Navigate to project directory
cd "/home/sama/Desktop/organic website/organic-shop"

# Add GitHub remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/organic-shop.git

# Verify remote was added
git remote -v

# Push to GitHub
git push -u origin main
```

**Expected output**: Your code will be uploaded to GitHub. Visit your repository URL to confirm.

## 3. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up or login
3. Create a **FREE** cluster (M0 Sandbox):
   - Cloud Provider: AWS
   - Region: Mumbai (ap-south-1) or Singapore (ap-southeast-1)
   - Cluster Name: `organic-shop-cluster`
4. **Security Setup**:
   - Database Access → Add New Database User
     - Username: `organicshop_user`
     - Password: Generate a secure password (save it!)
     - Role: Atlas admin
   - Network Access → Add IP Address
     - Click "Allow Access from Anywhere"
     - IP: `0.0.0.0/0` (required for Render)
5. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `myFirstDatabase` with `organic-shop`
   - Final format: `mongodb+srv://organicshop_user:YOUR_PASSWORD@cluster.mongodb.net/organic-shop?retryWrites=true&w=majority`

## 4. Deploy Backend on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Sign up with GitHub (recommended) or email
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository:
   - Click "Configure account" if needed
   - Select your `organic-shop` repository
5. Configure the backend service:
   ```
   Name: organic-shop-backend
   Region: Singapore
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```
6. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   MONGODB_URI = mongodb+srv://organicshop_user:YOUR_PASSWORD@cluster.mongodb.net/organic-shop
   PORT = 5000
   NODE_ENV = production
   FRONTEND_URL = https://organic-shop-frontend.onrender.com
   JWT_SECRET = your_random_secret_key_minimum_32_characters_long
   ```
   
   **Generate a strong JWT_SECRET**:
   ```bash
   # Run this command to generate a random secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

7. Click **"Create Web Service"**
8. Wait 5-10 minutes for deployment
9. **Copy the backend URL** (e.g., `https://organic-shop-backend.onrender.com`)

## 5. Deploy Frontend on Render

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Select your `organic-shop` repository
3. Configure the frontend:
   ```
   Name: organic-shop-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```
4. (Optional) Add Environment Variable if your frontend needs API URL:
   ```
   VITE_API_URL = https://organic-shop-backend.onrender.com
   ```
5. Click **"Create Static Site"**
6. Wait 3-5 minutes for deployment
7. **Copy the frontend URL** (e.g., `https://organic-shop-frontend.onrender.com`)

## 6. Update Backend CORS Settings

1. Go to your **backend service** on Render
2. Click **"Environment"** tab
3. Update the `FRONTEND_URL` variable with your actual frontend URL:
   ```
   FRONTEND_URL = https://organic-shop-frontend.onrender.com
   ```
4. Click **"Save Changes"** (this will redeploy the backend)

## 7. Verify Deployment ✅

Visit your frontend URL and test:
- ✅ Homepage loads correctly
- ✅ Dark mode toggle works
- ✅ Navigation between pages works
- ✅ Products page displays items
- ✅ Add to cart functionality
- ✅ Contact page shows Google Map (Sector 62, Noida)
- ✅ Responsive design on mobile
- ✅ Footer shows Indian contact details

## 🎉 Success!

Your OrganicShop is now live!

**Frontend**: https://organic-shop-frontend.onrender.com  
**Backend API**: https://organic-shop-backend.onrender.com

---

## 📌 Important Notes

### Free Tier Limitations (Render)
- **Backend**: Spins down after 15 minutes of inactivity
  - First request after inactivity takes ~30 seconds (cold start)
  - Keep alive: Use a service like [UptimeRobot](https://uptimerobot.com) to ping every 14 minutes
- **Frontend**: Always available (static site)
- **Monthly limits**: 750 hours/month (sufficient for one service)

### Troubleshooting

**Backend won't start:**
- Check logs in Render dashboard
- Verify MONGODB_URI is correct
- Ensure all environment variables are set

**Frontend shows errors:**
- Check build logs
- Verify all npm dependencies installed
- Clear cache and redeploy

**CORS errors:**
- Verify FRONTEND_URL in backend matches actual frontend URL
- Check backend CORS configuration in `backend/src/app.js`

**Database connection fails:**
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check database user credentials
- Test connection string locally

### Updating Your Deployment

Whenever you make changes:

```bash
# Make your changes
# Test locally

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

Render will **automatically redeploy** your application when you push to GitHub!

---

## 🔗 Useful Links

- **MongoDB Atlas**: https://cloud.mongodb.com
- **Render Dashboard**: https://dashboard.render.com
- **GitHub Repository**: https://github.com/your-username/organic-shop
- **UptimeRobot** (keep backend alive): https://uptimerobot.com

## 💡 Tips for Production

1. **Custom Domain**: Render allows custom domains (even on free tier)
2. **SSL**: Automatically provided by Render
3. **Environment Variables**: Never commit `.env` files
4. **Database Backups**: Set up in MongoDB Atlas
5. **Monitoring**: Use Render's built-in monitoring or external tools

---

**Need help?** Check the README.md or open an issue on GitHub!
