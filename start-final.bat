@echo off
title Rich and Jane Coffee - Final Server
color 0A
cls
echo.
echo ========================================
echo  Rich and Jane Coffee - Final Server
echo ========================================
echo.
echo Starting FINAL server on localhost:3000...
echo This should fix the menu API issues!
echo.
echo Keep this window OPEN
echo.
echo ACCESS LINKS:
echo Menu: http://localhost:3000/menu.html?table=1
echo Kitchen: http://localhost:3000/kitchen.html
echo Health: http://localhost:3000/api/health
echo Press Ctrl+C to stop
echo.
cd /d "D:\skripsi"
node final-server.js
pause