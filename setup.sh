#!/usr/bin/env bash
set -e

echo "🚀 Starting Study-Galaxy setup..."

# 1. Check Node.js (>= v14)
if ! command -v node &>/dev/null; then
  echo "❌ Node.js not found. Please install it (v14+)."
  exit 1
else
  NODE_VER=$(node -v | sed 's/^v//')
  NODE_MAJOR=${NODE_VER%%.*}
  if (( NODE_MAJOR < 14 )); then
    echo "❌ Node.js version ${NODE_VER} detected. Require v14 or above."
    exit 1
  fi
  echo "✅ Node.js v${NODE_VER}"
fi

# 2. Check npm (>= v6)
if ! command -v npm &>/dev/null; then
  echo "❌ npm not found. Please install npm (v6+)."
  exit 1
else
  NPM_VER=$(npm -v)
  NPM_MAJOR=${NPM_VER%%.*}
  if (( NPM_MAJOR < 6 )); then
    echo "❌ npm version ${NPM_VER} detected. Require v6 or above."
    exit 1
  fi
  echo "✅ npm v${NPM_VER}"
fi

# 3. Check Git
if ! command -v git &>/dev/null; then
  echo "❌ Git not found. Please install Git."
  exit 1
else
  echo "✅ Git found"
fi

# 4. Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
cd ..

# 5. Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Setup complete!"
echo
echo "To start:"
echo "  Terminal 1 → cd server && npm start"
echo "  Terminal 2 → cd frontend && npm start"
