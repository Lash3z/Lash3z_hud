
@echo off
echo ======================================
echo LASH3Z HUD Auto-Deploy Script
echo ======================================

REM Stage all changes
git add .
if %errorlevel% neq 0 (
    echo [ERROR] Failed to stage changes.
    pause
    exit /b %errorlevel%
)

REM Commit changes with timestamp
set dt=%date% %time%
git commit -m "Auto-deploy: %dt%"
if %errorlevel% neq 0 (
    echo [WARNING] Nothing to commit or commit failed.
)

REM Push changes
git push origin main
if %errorlevel% neq 0 (
    echo [ERROR] Failed to push changes.
    pause
    exit /b %errorlevel%
)

echo [SUCCESS] HUD changes deployed to GitHub.
pause
