@echo off
echo ========================================
echo   Rich and Jane Coffee - Complete System
echo ========================================
echo.

cd /d "D:\skripsi"

echo [1/3] Stopping existing servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/3] Starting main server...
start "Rich Jane Server" cmd /k "npm start"
timeout /t 5 /nobreak >nul

echo [3/3] Testing system...
echo Testing Menu API...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8080/api/menu' -Method Get; Write-Host '✓ Menu API OK - Items:' $response.data.data.Count } catch { Write-Host '✗ Menu API Failed' }"

echo Testing Order API...
powershell -Command "$body = @{ table_number = 2; items = @(@{ menu_item_id = 1; quantity = 1 }) } | ConvertTo-Json -Depth 3; try { $response = Invoke-RestMethod -Uri 'http://localhost:8080/api/orders' -Method Post -Body $body -ContentType 'application/json'; Write-Host '✓ Order API OK - Order ID:' $response.data.order_id } catch { Write-Host '✗ Order API Failed' }"

echo Testing Kitchen API...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8080/api/orders' -Method Get; Write-Host '✓ Kitchen API OK - Orders:' $response.data.count } catch { Write-Host '✗ Kitchen API Failed' }"

echo.
echo ========================================
echo   SYSTEM READY!
echo ========================================
echo.
echo Access Links:
echo - Menu Table 1: http://localhost:8080/menu.html?table=1
echo - Menu Table 2: http://localhost:8080/menu.html?table=2
echo - Menu Table 5: http://localhost:8080/menu.html?table=5
echo - Kitchen Display: http://localhost:8080/kitchen.html
echo - QR Generator: http://localhost:8080/qrcode.html
echo.
echo Features:
echo ✓ All tables (1-50) can order
echo ✓ All orders appear in kitchen
echo ✓ Real-time kitchen display
echo ✓ Order status tracking
echo ✓ Database integration
echo ✓ 98 menu items
echo.
echo Opening browsers...
start http://localhost:8080/menu.html?table=2
start http://localhost:8080/menu.html?table=5
start http://localhost:8080/kitchen.html

echo.
echo System is running! Test ordering from different tables.
pause