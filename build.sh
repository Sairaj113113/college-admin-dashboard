#!/usr/bin/env bash
set -e

# Install backend dependencies
pip install -r backend/requirements.txt

# Build React frontend
cd frontend
npm install
npm run build
cd ..

# Copy build output to Flask folders
rm -rf backend/static backend/templates
mkdir -p backend/static backend/templates
cp -r frontend/build/static backend/static/
cp frontend/build/index.html backend/templates/index.html
