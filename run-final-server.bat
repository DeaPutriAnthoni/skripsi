@echo off
echo ========================================
echo   Rich and Jane Coffee Server
echo ========================================
echo.

cd /d "D:\skripsi"

echo Killing existing processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Starting server...
start "Rich Jane Server" cmd /k "node test-server.js"

echo Waiting for server to start...
timeout /t 5 /nobreak >nul

echo Testing server...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://127.0.0.1:8080/api/menu' -Method Get; Write-Host 'SUCCESS: Server is running!' } catch { Write-Host 'ERROR: Server not responding' }"

echo.
echo ========================================
echo   Server Information:
echo   - Menu API: http://127.0.0.1:8080/api/menu
echo   - Table 2: http://127.0.0.1:8080/menu.html?table=2
echo   - Table 3: http://127.0.0.1:8080/menu.html?table=3
echo   - Kitchen: http://127.0.0.1:8080/kitchen.html
echo ========================================
echo.
echo Press any key to open browser...
pause >nul

echo Opening browser for table 2...
start http://127.0.0.1:8080/menu.html?table=2

echo Opening browser for table 3...
start http://127.0.0.1:8080/menu.html?table=3

echo.
echo Server is running! Test checkout for table 2 and 3.
pause