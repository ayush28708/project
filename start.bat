@echo off
echo ========================================================
echo   Launching SPORETS LIVE Hub
echo   Live Sports Streaming, Scorecards & Commentary
echo ========================================================
start "" "http://localhost:8080/"
powershell -ExecutionPolicy Bypass -File server.ps1 -Port 8080
pause
