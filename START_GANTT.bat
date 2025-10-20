@echo off
echo ========================================
echo   INICIANDO DIAGRAMA DE GANTT
echo   Ordenes de Mantenimiento
echo ========================================
echo.

cd /d "D:\2024\GEMINI\MisterSAPPM\UI5Projects\com.mycompany.newapp"

echo Verificando dependencias...
if not exist node_modules (
    echo.
    echo Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: No se pudieron instalar las dependencias
        pause
        exit /b 1
    )
)

echo.
echo Iniciando aplicacion...
echo.
echo La aplicacion se abrira en: http://localhost:8080
echo.
echo Presiona Ctrl+C para detener la aplicacion
echo.

call npm start

pause
