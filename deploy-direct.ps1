Write-Host "Deploying AgriNova directly to Vercel..." -ForegroundColor Green

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found!" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Generate Prisma client
Write-Host "Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Deploy to Vercel
Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod --yes

Write-Host "Deployment complete!" -ForegroundColor Green