@echo off
echo ========================================
echo AgriNova Setup Script
echo ========================================
echo.

echo Step 1: Creating directories...
mkdir prisma 2>nul
mkdir components 2>nul
mkdir app\admin 2>nul
mkdir app\agent 2>nul
mkdir app\login 2>nul
mkdir app\api\auth\login 2>nul
mkdir app\api\auth\me 2>nul
mkdir app\api\auth\logout 2>nul
mkdir app\api\fields\update 2>nul
mkdir app\api\fields\stats 2>nul
mkdir app\api\fields\my-fields 2>nul
mkdir app\api\admin\users 2>nul

echo Step 2: Installing dependencies...
call npm install --legacy-peer-deps

echo Step 3: Generating Prisma client...
call npx prisma generate

echo Step 4: Setting up database...
echo Please make sure PostgreSQL is installed
echo Or we can use SQLite for testing
echo.
choice /C YN /M "Use SQLite instead of PostgreSQL? (Easier setup)"

if errorlevel 2 goto postgres
if errorlevel 1 goto sqlite

:sqlite
echo Using SQLite...
echo DATABASE_URL="file:./dev.db" > .env.local
echo JWT_SECRET="your-super-secret-jwt-key" >> .env.local
echo NEXTAUTH_SECRET="your-nextauth-secret-key" >> .env.local
echo NEXTAUTH_URL="http://localhost:3000" >> .env.local
call npx prisma db push
call node prisma/seed.js
goto end

:postgres
echo Using PostgreSQL...
echo Please enter your PostgreSQL password:
set /p pgpass="Password: "
echo DATABASE_URL="postgresql://postgres:%pgpass%@localhost:5432/agrinova?schema=public" > .env.local
echo JWT_SECRET="your-super-secret-jwt-key" >> .env.local
echo NEXTAUTH_SECRET="your-nextauth-secret-key" >> .env.local
echo NEXTAUTH_URL="http://localhost:3000" >> .env.local
call npx prisma db push
call node prisma/seed.js
goto end

:end
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application, run:
echo npm run dev
echo.
echo Demo Credentials:
echo Admin: admin@agrinova.com / admin123
echo Agent: john@agrinova.com / agent123
echo.
pause