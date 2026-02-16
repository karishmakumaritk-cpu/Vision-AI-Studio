#!/bin/bash

# HerBalance AI Studio - Setup Verification Script
# Run this to verify everything is set up correctly

echo "🔍 HerBalance AI Studio - Setup Verification"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASS=0
WARN=0
FAIL=0

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print results
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASS:${NC} $2"
        ((PASS++))
    elif [ $1 -eq 1 ]; then
        echo -e "${YELLOW}⚠️  WARN:${NC} $2"
        ((WARN++))
    else
        echo -e "${RED}❌ FAIL:${NC} $2"
        ((FAIL++))
    fi
}

echo -e "${BLUE}Checking Prerequisites...${NC}"
echo ""

# 1. Check Node.js
if command_exists node; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ PASS:${NC} Node.js is installed ($NODE_VERSION)"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL:${NC} Node.js is not installed"
    echo "   Install from: https://nodejs.org"
    ((FAIL++))
fi

# 2. Check npm
if command_exists npm; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ PASS:${NC} npm is installed ($NPM_VERSION)"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL:${NC} npm is not installed"
    ((FAIL++))
fi

echo ""
echo -e "${BLUE}Checking Frontend...${NC}"
echo ""

# 3. Check if package.json exists
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ PASS:${NC} Frontend package.json found"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL:${NC} Frontend package.json not found"
    ((FAIL++))
fi

# 4. Check if node_modules exists
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ PASS:${NC} Frontend node_modules found"
    ((PASS++))
else
    echo -e "${YELLOW}⚠️  WARN:${NC} Frontend node_modules not found (run: npm install)"
    ((WARN++))
fi

# 5. Check if Contact.jsx exists
if [ -f "src/pages/Contact.jsx" ]; then
    echo -e "${GREEN}✅ PASS:${NC} Contact.jsx found"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL:${NC} Contact.jsx not found"
    ((FAIL++))
fi

echo ""
echo -e "${BLUE}Checking Backend...${NC}"
echo ""

# 6. Check backend folder
if [ -d "backend" ]; then
    echo -e "${GREEN}✅ PASS:${NC} Backend folder exists"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL:${NC} Backend folder not found"
    ((FAIL++))
fi

# 7. Check backend package.json
if [ -f "backend/package.json" ]; then
    echo -e "${GREEN}✅ PASS:${NC} Backend package.json found"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL:${NC} Backend package.json not found"
    ((FAIL++))
fi

# 8. Check backend node_modules
if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✅ PASS:${NC} Backend node_modules found"
    ((PASS++))
else
    echo -e "${YELLOW}⚠️  WARN:${NC} Backend node_modules not found (run: cd backend && npm install)"
    ((WARN++))
fi

# 9. Check backend server.js
if [ -f "backend/server.js" ]; then
    echo -e "${GREEN}✅ PASS:${NC} Backend server.js found"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL:${NC} Backend server.js not found"
    ((FAIL++))
fi

# 10. Check .env.example
if [ -f "backend/.env.example" ]; then
    echo -e "${GREEN}✅ PASS:${NC} Backend .env.example found"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL:${NC} Backend .env.example not found"
    ((FAIL++))
fi

# 11. Check .env (should not exist yet)
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  WARN:${NC} Backend .env not found (create from .env.example)"
    ((WARN++))
else
    echo -e "${GREEN}✅ PASS:${NC} Backend .env found"
    ((PASS++))
fi

echo ""
echo -e "${BLUE}Checking Database...${NC}"
echo ""

# 12. Check schema.sql
if [ -f "backend/database/schema.sql" ]; then
    echo -e "${GREEN}✅ PASS:${NC} Database schema.sql found"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL:${NC} Database schema.sql not found"
    ((FAIL++))
fi

echo ""
echo -e "${BLUE}Checking Documentation...${NC}"
echo ""

# 13. Check START_HERE.md
if [ -f "START_HERE.md" ]; then
    echo -e "${GREEN}✅ PASS:${NC} START_HERE.md found"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL:${NC} START_HERE.md not found"
    ((FAIL++))
fi

# 14. Check SETUP.md
if [ -f "SETUP.md" ]; then
    echo -e "${GREEN}✅ PASS:${NC} SETUP.md found"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL:${NC} SETUP.md not found"
    ((FAIL++))
fi

# 15. Check backend/README.md
if [ -f "backend/README.md" ]; then
    echo -e "${GREEN}✅ PASS:${NC} Backend README.md found"
    ((PASS++))
else
    echo -e "${RED}❌ FAIL:${NC} Backend README.md not found"
    ((FAIL++))
fi

echo ""
echo -e "${BLUE}Port Availability...${NC}"
echo ""

# 16. Check if port 5000 is available
if netstat -tuln 2>/dev/null | grep -q ':5000'; then
    echo -e "${YELLOW}⚠️  WARN:${NC} Port 5000 might be in use"
    ((WARN++))
else
    echo -e "${GREEN}✅ PASS:${NC} Port 5000 is available"
    ((PASS++))
fi

# 17. Check if port 5173 is available
if netstat -tuln 2>/dev/null | grep -q ':5173'; then
    echo -e "${YELLOW}⚠️  WARN:${NC} Port 5173 might be in use"
    ((WARN++))
else
    echo -e "${GREEN}✅ PASS:${NC} Port 5173 is available"
    ((PASS++))
fi

echo ""
echo "=============================================="
echo -e "${BLUE}Verification Results${NC}"
echo "=============================================="
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${YELLOW}Warnings: $WARN${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo ""

# Overall result
if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✅ Setup looks good!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. cd backend && npm install (if needed)"
    echo "2. Create backend/.env from .env.example"
    echo "3. Fill in Supabase credentials"
    echo "4. Run: npm run dev (frontend)"
    echo "5. Run: cd backend && npm run dev (backend in new terminal)"
    echo -e ""
    echo "Then go to: http://localhost:5173/contact"
    exit 0
else
    echo -e "${RED}❌ Setup has errors. Fix above issues first.${NC}"
    exit 1
fi
