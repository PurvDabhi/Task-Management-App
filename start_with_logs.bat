@echo off
echo Starting backend server with logging...
cd backend
start "Backend Server" cmd /k "npm run dev > ../backend_logs.txt 2>&1"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo Starting frontend with logging...
cd ../frontend
start "Frontend Server" cmd /k "npm start > ../frontend_logs.txt 2>&1"

echo Both servers started with logging enabled.
echo Check backend_logs.txt and frontend_logs.txt for output.
pause