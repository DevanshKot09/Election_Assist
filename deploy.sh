#!/bin/bash

# Deployment script for Indian Election Assistant to Google Cloud
# Project ID: attempt1-495115
# Account: aishorts457@gmail.com

set -e  # Exit on error

echo "🚀 Starting deployment to Google Cloud..."
echo "Project ID: attempt1-495115"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Error: gcloud CLI is not installed${NC}"
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

echo -e "${GREEN}✓ gcloud CLI found${NC}"

# Set the project
echo ""
echo "Setting Google Cloud project..."
gcloud config set project attempt1-495115

# Check if user is authenticated
echo ""
echo "Checking authentication..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${YELLOW}⚠ Not authenticated. Running authentication...${NC}"
    gcloud auth login
fi

echo -e "${GREEN}✓ Authenticated${NC}"

# Enable required APIs
echo ""
echo "Enabling required Google Cloud APIs..."
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable firestore.googleapis.com
gcloud services enable maps-backend.googleapis.com

echo -e "${GREEN}✓ APIs enabled${NC}"

# Create App Engine app if it doesn't exist
echo ""
echo "Checking App Engine application..."
if ! gcloud app describe &> /dev/null; then
    echo -e "${YELLOW}⚠ App Engine app not found. Creating...${NC}"
    echo "Please select a region (e.g., asia-south1 for Mumbai):"
    gcloud app create
else
    echo -e "${GREEN}✓ App Engine app exists${NC}"
fi

# Build the application (if using Vite)
echo ""
echo "Building application..."
if [ -f "package.json" ]; then
    echo "Installing dependencies..."
    npm install
    
    # Check if build script exists
    if grep -q '"build"' package.json; then
        echo "Running build..."
        npm run build
        
        # If dist folder exists, we need to adjust deployment
        if [ -d "dist" ]; then
            echo -e "${YELLOW}⚠ Build creates dist folder. Copying files...${NC}"
            # Copy necessary files to dist
            cp app.yaml dist/ 2>/dev/null || true
            cp manifest.json dist/ 2>/dev/null || true
            cp sw.js dist/ 2>/dev/null || true
            
            # Deploy from dist folder
            cd dist
        fi
    fi
fi

echo -e "${GREEN}✓ Build complete${NC}"

# Deploy to App Engine
echo ""
echo "Deploying to Google App Engine..."
gcloud app deploy app.yaml --quiet

# Get the deployed URL
APP_URL=$(gcloud app browse --no-launch-browser)

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ Deployment successful!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Your application is now live at:"
echo -e "${GREEN}${APP_URL}${NC}"
echo ""
echo "Additional commands:"
echo "  View logs:    gcloud app logs tail -s default"
echo "  Open browser: gcloud app browse"
echo "View in console: https://console.cloud.google.com/appengine?project=attempt1-495115"
echo ""
echo -e "${YELLOW}⚠ Remember to update your Firebase configuration with the actual project details!${NC}"
echo ""

# Made with Bob
