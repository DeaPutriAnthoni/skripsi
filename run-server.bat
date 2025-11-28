@echo off
title Rich and Jane Coffee Server
color 0A
echo.
echo ========================================
echo    Rich and Jane Coffee Test Server
echo ========================================
echo.
echo Starting server...
cd /d "D:\skripsi"
node test-server.js
echo.
echo Server stopped. Press any key to exit...
pause > nul