@echo off
title Rich and Jane Coffee - Localhost Server
color 0A
cls
echo.
echo ========================================
echo  Rich and Jane Coffee - Localhost Server
echo ========================================
echo.
echo Starting server on localhost:8080...
echo.
echo Keep this window OPEN while testing
echo Press Ctrl+C to stop server
echo.
cd /d "D:\skripsi"
node localhost-server.js
pause