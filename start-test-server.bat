@echo off
title Rich and Jane Coffee - Connection Test Server
color 0A
cls
echo.
echo ========================================
echo   Rich and Jane Coffee - Test Server
echo ========================================
echo.
echo Starting server on PORT 8080...
echo.
echo === ACCESS LINKS ===
echo Main: http://localhost:8080
echo Menu: http://localhost:8080/menu.html?table=1
echo Kitchen: http://localhost:8080/kitchen.html
echo Health API: http://localhost:8080/api/health
echo Menu API: http://localhost:8080/api/menu
echo Orders API: http://localhost:8080/api/orders
echo QR Table 1: http://localhost:8080/api/qrcode/1
echo QR Table 2: http://localhost:8080/api/qrcode/2
echo.
echo === INSTRUCTIONS ===
echo 1. Keep this window OPEN
echo 2. Open browser and test ALL tables:
echo    - Table 1: http://localhost:8080/menu.html?table=1
echo    - Table 2: http://localhost:8080/menu.html?table=2
echo    - Table 3: http://localhost:8080/menu.html?table=3
echo    - (Works for ALL table numbers 1-50)
echo 3. Server is ready when you see requests below
echo.
echo Press Ctrl+C to stop server
echo ========================================
echo.
cd /d "D:\skripsi"
node test-connection.js