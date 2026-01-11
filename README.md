# 🌿 OrganicShop - MERN E-Commerce Platform

A modern, full-stack e-commerce platform for organic products built with the MERN stack (MongoDB, Express, React, Node.js).

![OrganicShop](https://img.shields.io/badge/version-1.0.0-green.svg)
![React](https://img.shields.io/badge/React-19.2.0-blue.svg)
![Node](https://img.shields.io/badge/Node-Express-green.svg)

## 🌟 Features

- **Modern UI/UX**: Clean, responsive design with dark mode support
- **Product Management**: Browse organic products with filtering and search
- **Shopping Cart**: Add to cart with quantity management
- **Wishlist**: Save favorite products for later
- **User Authentication**: Secure login and registration UI
- **Contact & About Pages**: Professional company information with Google Maps
- **Indian Localization**: INR currency, Indian address and contact details
- **Google Maps Integration**: Real location display (Sector 62, Noida)
- **Responsive Design**: Mobile-first approach with tablet and desktop views
- **Dark Mode**: Full dark mode support across all pages

## 🚀 Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **React Router DOM 7.12.0** - Client-side routing
- **Vite 7.2.4** - Build tool and dev server
- **React Icons 5.5.0** - Professional icon library
- **Pure CSS** - No frameworks, custom styling with CSS variables

### Backend
- **Node.js** - Runtime environment
- **Express 4.18.2** - Web framework
- **MongoDB + Mongoose** - Database (ready for integration)
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
organic-shop/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable components (Navbar, Footer)
│   │   ├── pages/        # Page components (Home, Products, Cart, etc.)
│   │   ├── context/      # React Context (Cart, Wishlist)
│   │   ├── layouts/      # Layout components
│   │   ├── assets/       # Images and icons
│   │   ├── data/         # Static product data
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── public/           # Static assets
│   ├── index.html        # HTML template
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies
│
├── backend/              # Express backend API
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── app.js        # Express app setup
│   │   └── server.js     # Server entry point
│   ├── .env.example      # Environment variables template
│   └── package.json      # Backend dependencies
│
├── .gitignore            # Git ignore rules
├── .env.example          # Root environment variables template
├── package.json          # Root scripts
└── README.md             # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB account (MongoDB Atlas recommended)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/organic-shop.git
   cd organic-shop
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (frontend + backend)
   npm run install:all
   
   # Or install separately
   npm run install:frontend
   npm run install:backend
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` in the `backend/` directory:
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Then edit `backend/.env` with your actual values:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your_secret_key
   ```

4. **Run the application**
   
   ```bash
   # From root directory
   # Run both frontend and backend
   npm run dev:all
   
   # Or run separately in different terminals
   npm run dev              # Frontend only (Vite on port 5173)
   npm run dev:backend      # Backend only (Express on port 5000)
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 🌐 Deployment on Render

### Prerequisites
- GitHub account
- Render account ([render.com](https://render.com) - free tier available)
- MongoDB Atlas account ([mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))

### Step 1: Prepare MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0 Sandbox)
3. Create a database user with password
4. Get your connection string
5. Network Access: Add `0.0.0.0/0` to whitelist (allow all IPs for Render)

### Step 2: Push to GitHub

```bash
# Navigate to project directory
cd organic-shop

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: OrganicShop MERN e-commerce platform"

# Create main branch
git branch -M main

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/your-username/organic-shop.git

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy Backend on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `organic-shop-backend`
   - **Environment**: `Node`
   - **Region**: Singapore (closest to India)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/organic-shop
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-name.onrender.com
   JWT_SECRET=your_random_secret_key_min_32_chars
   ```

6. Click **Create Web Service**
7. Wait for deployment (5-10 minutes)
8. Copy the backend URL (e.g., `https://organic-shop-backend.onrender.com`)

### Step 4: Deploy Frontend on Render

1. In Render Dashboard, click **New** → **Static Site**
2. Connect your GitHub repository
3. Configure the site:
   - **Name**: `organic-shop-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variable (optional, if your frontend needs it):
   ```
   VITE_API_URL=https://organic-shop-backend.onrender.com
   ```

5. Click **Create Static Site**
6. Wait for deployment (3-5 minutes)

### Step 5: Update Backend CORS Settings

After frontend is deployed, update the `FRONTEND_URL` in your backend environment variables on Render:

1. Go to backend service → Environment
2. Update `FRONTEND_URL` with your actual frontend URL
3. Save changes (will trigger redeployment)

### Step 6: Verify Deployment

1. Visit your frontend URL (e.g., `https://organic-shop-frontend.onrender.com`)
2. Test all features:
   - Browse products
   - Add to cart
   - Toggle dark mode
   - View Contact page with Google Maps
   - Check responsive design on mobile
   - Test all page navigation

## 📝 Available Scripts

### Root Level
- `npm run dev` - Run frontend development server
- `npm run dev:backend` - Run backend development server  
- `npm run dev:all` - Run both frontend and backend concurrently
- `npm run build` - Build frontend for production
- `npm run install:all` - Install all dependencies
- `npm run install:frontend` - Install frontend dependencies only
- `npm run install:backend` - Install backend dependencies only

### Frontend (`cd frontend`)
- `npm run dev` - Start Vite dev server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Backend (`cd backend`)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🎨 Design System

### Color Scheme

#### Light Mode
- Primary Green: `#4CAF50`
- Background: `#ffffff`, `#fafafa`
- Text: `#2c3e50`, `#555`
- Border: `#e0e0e0`

#### Dark Mode
- Background: `#121212`, `#181818`, `#1f1f1f`, `#1a1a1a`
- Text: `#f5f5f5`, `#cfcfcf`, `#9e9e9e`
- Primary Green: `#4CAF50`
- Footer Green: `#6BCF8E`
- Border: `#2a2a2a`

### Typography
- Font Family: System fonts (SF Pro, Segoe UI, Roboto)
- Transitions: 0.25s ease (consistent across all components)

## 📧 Contact Information

**OrganicShop Pvt. Ltd.**
- 📍 2nd Floor, Green Plaza, Sector 62, Noida, Uttar Pradesh 201301, India
- 📞 +91 98765 43210
- 📧 support@organicshop.in
- 🌐 Social: Facebook, Instagram, Twitter, YouTube

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Backend API routes need implementation
- Database models need to be created
- Authentication system needs backend integration

## 📋 Future Enhancements

- [ ] Complete backend API implementation
- [ ] MongoDB integration
- [ ] User authentication with JWT
- [ ] Payment gateway integration (Razorpay)
- [ ] Order management system
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Advanced search and filters
- [ ] Recommendation system

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- React team for React 19
- Vite team for the blazing fast build tool
- React Icons for the comprehensive icon library
- Google Maps for location services
- MongoDB Atlas for database hosting
- Render for free hosting platform

---

**Made with ❤️ for organic product lovers in India** 🇮🇳
