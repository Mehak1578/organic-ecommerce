#!/bin/bash

echo "════════════════════════════════════════════════════════════"
echo "  🔍 CHECKING YOUR RENDER DEPLOYMENT"
echo "════════════════════════════════════════════════════════════"
echo ""

echo "1️⃣  Testing Backend Health..."
HEALTH=$(curl -s https://organic-ecommerce-yr0g.onrender.com/api/health)
echo "   Response: $HEALTH"
echo ""

if echo "$HEALTH" | grep -q "OK"; then
    echo "   ✅ Backend is running!"
else
    echo "   ❌ Backend is NOT running!"
    exit 1
fi

echo "2️⃣  Testing Registration Endpoint..."
REGISTER=$(curl -s -X POST https://organic-ecommerce-yr0g.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test'$(date +%s)'@test.com","password":"test1234"}')
echo "   Response: $REGISTER"
echo ""

if echo "$REGISTER" | grep -q "success.*true"; then
    echo "   ✅ Registration works! Your app is FIXED!"
elif echo "$REGISTER" | grep -q "already exists"; then
    echo "   ✅ Database is connected! (email exists means DB works)"
elif echo "$REGISTER" | grep -q "Server error"; then
    echo "   ❌ DATABASE CONNECTION FAILED!"
    echo ""
    echo "════════════════════════════════════════════════════════════"
    echo "  🚨 ACTION REQUIRED: FIX MONGODB CONNECTION"
    echo "════════════════════════════════════════════════════════════"
    echo ""
    echo "YOUR BACKEND IS RUNNING BUT MONGODB IS BLOCKED!"
    echo ""
    echo "DO THIS NOW:"
    echo ""
    echo "1. Open: https://cloud.mongodb.com/"
    echo "2. Click 'Network Access' in left menu"
    echo "3. Click '+ ADD IP ADDRESS'"
    echo "4. Click 'ALLOW ACCESS FROM ANYWHERE'"
    echo "5. Confirm (it shows 0.0.0.0/0)"
    echo "6. Wait 2 minutes"
    echo "7. Run this script again to test"
    echo ""
    echo "════════════════════════════════════════════════════════════"
else
    echo "   ⚠️  Unknown error: $REGISTER"
fi

echo ""
echo "Done!"
