@echo off
echo Starting Rich and Jane Coffee Server...
cd /d "D:\skripsi"
start "Server" cmd /k "node server.js"
echo Server starting on http://localhost:8080
echo Please wait a few seconds for server to initialize...
timeout /t 5 /nobreak >nul
echo.
echo Server should be running now. You can access:
echo - Menu: http://localhost:8080/menu.html?table=1
echo - Kitchen: http://localhost:8080/kitchen.html
echo - API Docs: http://localhost:8080/api/docs
pause