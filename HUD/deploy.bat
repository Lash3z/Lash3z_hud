
@echo off
echo ======================================
echo LASH3Z HUD Auto-Deploy Script (Day 21)
echo ======================================

REM Pull latest changes
echo [INFO] Pulling latest changes from origin...
git pull origin main
if %errorlevel% neq 0 (
    echo [ERROR] Git pull failed. Resolve conflicts manually.
    pause
    exit /b %errorlevel%
)

REM Read and increment version
setlocal enabledelayedexpansion
set "VERSION_FILE=VERSION.txt"
if not exist "%VERSION_FILE%" (
    echo LASH3Z HUD Version: v1.0 > "%VERSION_FILE%"
)
for /f "tokens=3 delims= " %%a in ('findstr "LASH3Z HUD Version" "%VERSION_FILE%"') do set CURRENT_VER=%%a
set CURRENT_VER=!CURRENT_VER:v=!
for /f "tokens=1,2 delims=." %%a in ("!CURRENT_VER!") do (
    set MAJOR=%%a
    set MINOR=%%b
)
set /a MINOR+=1
set NEW_VER=v%MAJOR%.%MINOR%
echo LASH3Z HUD Version: !NEW_VER! > "%VERSION_FILE%"
echo Build Date: %date% %time% >> "%VERSION_FILE%"
echo [INFO] Updated VERSION.txt to !NEW_VER!

REM Stage, commit, and push
git add .
git commit -m "Auto-deploy: !NEW_VER!"
git push origin main

REM Tag the new version
git tag !NEW_VER!
git push origin !NEW_VER!

echo [SUCCESS] HUD changes deployed and tagged with !NEW_VER!.
pause
