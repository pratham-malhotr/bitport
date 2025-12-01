#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 BitPort Setup Script${NC}\n"

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL is not installed. Please install MySQL first.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Setting up BitPort...${NC}\n"

# Backend setup
echo -e "${YELLOW}1️⃣  Setting up Backend...${NC}"
cd backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}\n"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

# Frontend setup
echo -e "${YELLOW}2️⃣  Setting up Frontend...${NC}"
cd ../frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}\n"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

cd ..

# Database setup
echo -e "${YELLOW}3️⃣  Setting up Database...${NC}"
echo -e "${YELLOW}Please provide MySQL credentials:${NC}"
read -p "MySQL Username (default: root): " MYSQL_USER
MYSQL_USER=${MYSQL_USER:-root}

read -sp "MySQL Password: " MYSQL_PASSWORD
echo ""

# Create database and tables
mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < backend/config/schema.sql
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database setup completed${NC}\n"
else
    echo -e "${RED}❌ Failed to setup database. Please check your MySQL credentials.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ BitPort setup completed successfully!${NC}\n"
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "1. Update backend/.env with your MySQL password"
echo "2. Update frontend/.env with correct API URL"
echo "3. Run backend: cd backend && npm start"
echo "4. Run frontend: cd frontend && npm start"
