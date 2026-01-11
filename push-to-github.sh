#!/bin/bash

# 🚀 Quick Deployment Script for OrganicShop
# This script helps you push your project to GitHub

echo "🌿 OrganicShop - GitHub Push Helper"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the organic-shop root directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not initialized"
    exit 1
fi

echo "📋 Current git status:"
git status --short
echo ""

# Ask for GitHub username
read -p "Enter your GitHub username: " github_username

if [ -z "$github_username" ]; then
    echo "❌ Error: GitHub username is required"
    exit 1
fi

# Ask for repository name (default: organic-shop)
read -p "Enter repository name [organic-shop]: " repo_name
repo_name=${repo_name:-organic-shop}

# Construct GitHub URL
github_url="https://github.com/${github_username}/${repo_name}.git"

echo ""
echo "🔗 GitHub Repository URL: $github_url"
echo ""
echo "⚠️  Make sure you have created this repository on GitHub first!"
echo "   Go to: https://github.com/new"
echo ""
read -p "Have you created the repository on GitHub? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo ""
    echo "Please create the repository on GitHub first:"
    echo "1. Go to https://github.com/new"
    echo "2. Repository name: $repo_name"
    echo "3. Description: MERN stack e-commerce platform for organic products"
    echo "4. Keep it public or private (your choice)"
    echo "5. DO NOT initialize with README, .gitignore, or license"
    echo "6. Click 'Create repository'"
    echo ""
    echo "Then run this script again!"
    exit 0
fi

echo ""
echo "🔗 Adding GitHub remote..."

# Check if remote already exists
if git remote | grep -q "^origin$"; then
    echo "⚠️  Remote 'origin' already exists. Removing it..."
    git remote remove origin
fi

# Add the remote
git remote add origin "$github_url"

if [ $? -eq 0 ]; then
    echo "✅ Remote added successfully!"
else
    echo "❌ Failed to add remote"
    exit 1
fi

echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Your code is now on GitHub!"
    echo ""
    echo "🔗 View your repository:"
    echo "   https://github.com/${github_username}/${repo_name}"
    echo ""
    echo "📖 Next steps:"
    echo "   1. Read DEPLOYMENT.md for Render deployment instructions"
    echo "   2. Set up MongoDB Atlas"
    echo "   3. Deploy backend on Render"
    echo "   4. Deploy frontend on Render"
    echo ""
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo ""
    echo "Common issues:"
    echo "1. Repository doesn't exist on GitHub"
    echo "2. Authentication failed (check your credentials)"
    echo "3. Network connection issues"
    echo ""
    echo "Try manual push:"
    echo "   git push -u origin main"
fi
