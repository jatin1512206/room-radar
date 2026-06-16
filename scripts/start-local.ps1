# Starts Firebase emulators, seeds data, then Vite dev server
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "Starting Firebase emulators..." -ForegroundColor Cyan
$emu = Start-Process -FilePath "npx" -ArgumentList "firebase","emulators:start","--only","firestore,storage" -PassThru -NoNewWindow

Write-Host "Waiting for Firestore emulator (port 8080)..." -ForegroundColor Cyan
$ready = $false
for ($i = 0; $i - 60; $i++) {
  try {
    $tcp = New-Object System.Net.Sockets.TcpClient
    $tcp.Connect("127.0.0.1", 8080)
    $tcp.Close()
    $ready = $true
    break
  } catch {
    Start-Sleep -Seconds 1
  }
}

if (-not $ready) {
  Write-Host "Emulator did not start in time. Try: npm run emulators" -ForegroundColor Red
  exit 1
}

Write-Host "Seeding sample properties..." -ForegroundColor Cyan
node scripts/seed-emulator.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Starting RoomRadar dev server..." -ForegroundColor Green
Set-Location "$Root\src"
npm run dev
