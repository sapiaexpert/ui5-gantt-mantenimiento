@echo off
chcp 65001 >nul
echo ========================================
echo   VERIFICACIÓN DE INSTALACIÓN
echo   Diagrama de Gantt - Mantenimiento
echo ========================================
echo.

cd /d "D:\2024\GEMINI\MisterSAPPM\UI5Projects\com.mycompany.newapp"

echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js NO está instalado
    echo    Descarga desde: https://nodejs.org/
    goto :error
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js instalado: %NODE_VERSION%
)

echo.
echo [2/5] Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm NO está instalado
    goto :error
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm instalado: %NPM_VERSION%
)

echo.
echo [3/5] Verificando archivos del proyecto...
set FILES_OK=1

if not exist "package.json" (
    echo ❌ Falta: package.json
    set FILES_OK=0
)
if not exist "ui5.yaml" (
    echo ❌ Falta: ui5.yaml
    set FILES_OK=0
)
if not exist "webapp\model\maintenanceOrders.json" (
    echo ❌ Falta: webapp\model\maintenanceOrders.json
    set FILES_OK=0
)
if not exist "webapp\controller\Main.controller.ts" (
    echo ❌ Falta: webapp\controller\Main.controller.ts
    set FILES_OK=0
)
if not exist "webapp\view\Main.view.xml" (
    echo ❌ Falta: webapp\view\Main.view.xml
    set FILES_OK=0
)

if %FILES_OK%==1 (
    echo ✅ Todos los archivos necesarios presentes
) else (
    goto :error
)

echo.
echo [4/5] Verificando dependencias...
if not exist "node_modules" (
    echo ⚠️  Carpeta node_modules no existe
    echo    Se instalará automáticamente al iniciar
) else (
    echo ✅ Carpeta node_modules existe
)

echo.
echo [5/5] Verificando estructura de datos...
findstr /C:"maintenanceOrders" "webapp\model\maintenanceOrders.json" >nul 2>&1
if errorlevel 1 (
    echo ❌ Estructura de datos incorrecta
    goto :error
) else (
    echo ✅ Estructura de datos JSON válida
)

echo.
echo ========================================
echo   ✅ VERIFICACIÓN COMPLETADA
echo ========================================
echo.
echo Todo está listo para ejecutar la aplicación.
echo.
echo Opciones:
echo   1. Ejecutar START_GANTT.bat
echo   2. O ejecutar: npm start
echo.
echo La aplicación se abrirá en: http://localhost:8080
echo.
goto :end

:error
echo.
echo ========================================
echo   ❌ VERIFICACIÓN FALLIDA
echo ========================================
echo.
echo Por favor, revisa los errores anteriores.
echo.
echo Soluciones comunes:
echo   - Instalar Node.js: https://nodejs.org/
echo   - Ejecutar: npm install
echo   - Verificar que estás en el directorio correcto
echo.

:end
pause
