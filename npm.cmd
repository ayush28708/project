@echo off
echo [SPORETS LIVE] Starting Local Sports Hub Server...
if "%1"=="run" (
    powershell -ExecutionPolicy Bypass -File server.ps1 -Port 8080
    exit /b 0
)
if "%1"=="dev" (
    powershell -ExecutionPolicy Bypass -File server.ps1 -Port 8080
    exit /b 0
)
powershell -ExecutionPolicy Bypass -File server.ps1 -Port 8080
