#!/bin/bash

# HerBalance AI Studio - Auto Setup Script
# This script sets up the entire project in one command

echo "🚀 HerBalance AI Studio - Complete Setup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Frontend Setup
echo -e "${BLUE}Step 1: Installing Frontend Dependencies...${NC}"
npm install

# Step 2: Backend Setup
echo -e "${BLUE}Step 2: Installing Backend Dependencies...${NC}"
cd backend
npm install

# Step 3: Create .env file
echo -e "${BLUE}Step 3: Creating .env file...${NC}"
if [ ! -f .env ]; then
  cp .env.example .env
  echo -e "${YELLOW}⚠️  Created .env file. Please edit with your credentials:${NC}"
  echo "   - SUPABASE_URL"
  echo "   - SUPABASE_ANON_KEY"
  echo "   - SUPABASE_SERVICE_KEY"
  echo "   - SMTP_USER (optional)"
  echo "   - SMTP_PASS (optional)"
else
  echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Step 4: Summary
echo ""
echo -e "${GREEN}=========================================="
echo "✅ Setup Complete!"
echo "==========================================${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo "1. Edit backend/.env with your credentials"
echo "   - Supabase: https://app.supabase.com"
echo "   - Gmail App Password: myaccount.google.com"
echo ""
echo "2. Setup Supabase Database:"
echo "   - Paste backend/database/schema.sql in SQL Editor"
echo ""
echo "3. Start Frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Start Backend (in new terminal):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "5. Open http://localhost:5173 in browser"
echo ""
echo -e "${GREEN}Happy building! 🎉${NC}"
