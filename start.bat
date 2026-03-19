@echo off
echo.
echo  JobHunt AI - Starting...
echo.

REM -- Paste your Anthropic API key below (between the quotes) --
set ANTHROPIC_API_KEY=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

REM -- Check if Node.js is installed --
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo  ERROR: Node.js is not installed.
  echo  Download it from https://nodejs.org and install, then run this again.
  pause
  exit /b
)

echo  Server starting on http://localhost:3000
echo  Opening browser...
echo  Press Ctrl+C to stop.
echo.

REM -- Open browser after 1.5 seconds --
start "" /b cmd /c "timeout /t 2 >nul && start http://localhost:3000"

node server.js
pause