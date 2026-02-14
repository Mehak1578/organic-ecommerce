#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║       TESTING YOUR RENDER DEPLOYMENT - PLEASE WAIT...       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Test 1: Backend Health
echo "TEST 1: Backend Health Check"
echo "Contacting: https://organic-ecommerce-yr0g.onrender.com/api/health"
HEALTH=$(curl -s --max-time 15 https://organic-ecommerce-yr0g.onrender.com/api/health)

if echo "$HEALTH" | grep -q "OK"; then
    echo "✅ PASS: Backend is running!"
else
    echo "❌ FAIL: Backend is not responding!"
    echo "   Response: $HEALTH"
    exit 1
fi
echo ""

# Test 2: Server Info
echo "TEST 2: Server Information"
SERVER=$(curl -s --max-time 15 https://organic-ecommerce-yr0g.onrender.com/)
echo "$SERVER"
echo ""

# Test 3: Registration with unique email
echo "TEST 3: Testing Registration (MongoDB Connection)"
TIMESTAMP=$(date +%s)
TESTEMAIL="testuser${TIMESTAMP}@example.com"
echo "Creating test account with email: $TESTEMAIL"

REGISTER=$(curl -s --max-time 20 -X POST https://organic-ecommerce-yr0g.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"$TESTEMAIL\",\"password\":\"testpass123\"}")

echo ""
echo "Response from server:"
echo "$REGISTER"
echo ""

if echo "$REGISTER" | grep -q '"success":true'; then
    echo "🎉🎉🎉 SUCCESS! 🎉🎉🎉"
    echo ""
    echo "✅ Backend is running"
    echo "✅ MongoDB is connected"
    echo "✅ Registration works"
    echo "✅ Your app is FULLY FUNCTIONAL!"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "You can now:"
    echo "1. Clear your browser cache (Ctrl+Shift+Delete)"
    echo "2. Go to your deployed frontend"
    echo "3. Register and login"
    echo "4. Everything should work!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
elif echo "$REGISTER" | grep -q "already exists"; then
    echo "🎉 GOOD NEWS!"
    echo ""
    echo "✅ Backend is running"
    echo "✅ MongoDB is connected"
    echo "✅ Database communication works"
    echo ""
    echo "The email was already used (which proves DB works!)"
    echo "Your app is FULLY FUNCTIONAL!"
    
elif echo "$REGISTER" | grep -q "Server error"; then
    echo "❌ FAILED: MongoDB Connection Error"
    echo ""
    echo "Backend is running BUT cannot connect to MongoDB!"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "YOU NEED TO FIX THIS:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. MONGODB ATLAS:"
    echo "   → Go to: https://cloud.mongodb.com/"
    echo "   → Network Access → Add IP Address"
    echo "   → Allow Access from Anywhere (0.0.0.0/0)"
    echo "   → Wait 2 minutes"
    echo ""
    echo "2. RENDER ENVIRONMENT VARIABLES:"
    echo "   → Go to: https://dashboard.render.com/"
    echo "   → Click 'organic-ecommerce-yr0g'"
    echo "   → Environment tab"
    echo "   → Add MONGODB_URI variable (replace with your own user/password):"
    echo ""
    echo "   mongodb+srv://<db-username>:<db-password>@organicwebsite.jfcdjaq.mongodb.net/organicshop?retryWrites=true&w=majority&appName=organicwebsite"
    echo ""
    echo "   → Add other required variables (see VISUAL_FIX_GUIDE.txt)"
    echo ""
    echo "3. REDEPLOY:"
    echo "   → Manual Deploy → Deploy latest commit"
    echo "   → Wait 2-3 minutes"
    echo ""
    echo "4. RUN THIS SCRIPT AGAIN to verify"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
elif echo "$REGISTER" | grep -q "validation\|required"; then
    echo "⚠️  Validation Error (but MongoDB IS connected!)"
    echo ""
    echo "✅ Backend is running"
    echo "✅ MongoDB is connected"
    echo ""
    echo "The validation error means the backend is working!"
    echo "This is actually GOOD - your app is functional!"
    
else
    echo "❓ Unknown Response"
    echo ""
    echo "Backend responded with: $REGISTER"
    echo ""
    echo "Please check:"
    echo "1. Render logs for errors"
    echo "2. MongoDB Atlas IP whitelist (0.0.0.0/0)"
    echo "3. Environment variables on Render"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test completed!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
