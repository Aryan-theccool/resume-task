@echo off
echo ===================================================
echo   AI RESUME SCREENER - ONE-CLICK LAUNCHER
echo ===================================================
echo.
echo [1/2] Starting Backend Server (FastAPI)...
start "FastAPI Backend" cmd /k "cd backend && pip install -r requirements.txt && uvicorn main:app --reload"

echo [2/2] Starting Frontend Server (Next.js)...
start "Next.js Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ===================================================
echo   App is launching!
echo   - Backend Server: http://localhost:8000
echo   - Frontend Interface: http://localhost:3000
echo.
echo   Please keep these command prompt windows open 
echo   while using the app. Enjoy!
echo ===================================================
echo.
pause
