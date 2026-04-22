Write-Host "========================================" -ForegroundColor Green
Write-Host "AgriNova Complete Deployment Script" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

cd C:\Users\HomePC\Desktop\agrinova-clean

Write-Host "Step 1: Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "Step 2: Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

Write-Host "Step 3: Building project..." -ForegroundColor Yellow
npm run build

Write-Host "Step 4: Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod --yes

Write-Host "Step 5: Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your app is now live!" -ForegroundColor Cyan
Write-Host "Check your Vercel dashboard for the URL" -ForegroundColor Cyan