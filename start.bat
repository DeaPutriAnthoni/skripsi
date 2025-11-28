@echo off
title Rich and Jane Coffee Server
color 0A
cls
echo.
echo ========================================
echo    Rich and Jane Coffee Server
echo ========================================
echo.
echo Starting server on port 8080...
echo.
cd /d "D:\skripsi"
node simple-http-server.js
echo.
echo Server stopped.
pause