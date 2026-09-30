param(
    [string]$Command,
    [string]$Script
)

Write-Host "[SPORETS LIVE] Starting Local Sports Hub Server at http://localhost:8080/ ..." -ForegroundColor Cyan
& powershell -ExecutionPolicy Bypass -File "$PSScriptRoot\server.ps1" -Port 8080
