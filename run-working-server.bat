@echo off
title Rich and Jane Coffee - Working Server
color 0A
cls
echo.
echo ========================================
echo  Rich and Jane Coffee - Working Server
echo ========================================
echo.
echo Starting server...
echo Server will run on: http://127.0.0.1:8080
echo.
echo Keep this window open while testing
echo Press Ctrl+C to stop server
echo.
cd /d "D:\skripsi"
node working-server.js
pause