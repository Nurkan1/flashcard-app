@echo off
echo ========================================
echo   Flashcard Study App - Instalacion Rapida
echo ========================================
echo.
echo Instalando dependencias...
npm install
echo.
echo Iniciando servidor de desarrollo...
echo La aplicacion se abrira en: http://localhost:5173
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
npm run dev
pause
