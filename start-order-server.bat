@echo off
title Rich and Jane Coffee - Order Testing Server
color 0A
cls
echo.
echo ========================================
echo   Rich and Jane Coffee - Order Server
echo ========================================
echo.
echo Starting server on PORT 8080...
echo.
echo === TESTING INSTRUCTIONS ===
echo 1. Keep this window OPEN
echo 2. Open browser: http://localhost:8080
echo 3. Test meja 2: http://localhost:8080/menu.html?table=2
echo 4. Add items to cart
echo 5. Click checkout
echo 6. Watch this window for debug info
echo.
echo === DEBUG INFO WILL APPEAR BELOW ===
echo.
cd /d "D:\skripsi"
node test-connection.js