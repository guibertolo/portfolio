@echo off
title Gerador de Proposta - Guilherme Bertolo
color 0B

echo.
echo ============================================================
echo   GERADOR DE PROPOSTA
echo   Guilherme Bertolo
echo ============================================================
echo.

REM Detecta se ja tem algo rodando em 3030
netstat -ano | findstr :3030 | findstr LISTENING >nul 2>&1
if %errorlevel%==0 (
  echo [OK] Dev server ja esta rodando na porta 3030.
  goto :OPEN_BROWSER
)

echo [...] Procurando dev servers antigos rodando neste projeto...

REM Mata qualquer next dev antigo rodando no diretorio do portfolio
REM Isso evita o erro "Another next dev server is already running"
powershell -NoProfile -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'next' -and $_.CommandLine -match 'dev' -and $_.CommandLine -match 'portfolio' } | ForEach-Object { Write-Host '  Matando PID' $_.ProcessId; Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }" 2>nul

timeout /t 2 /nobreak >nul

echo.
echo [...] Iniciando dev server na porta 3030...
echo.
echo Uma janela do terminal vai abrir e ficar rodando.
echo NAO FECHE essa janela enquanto estiver gerando propostas.
echo.

cd /d "C:\Users\guiro\OneDrive\Documentos\Claude\apps\portfolio"
start "Portfolio Dev (porta 3030)" cmd /k "npx next dev -p 3030"

echo Aguardando dev server ficar pronto...
echo (pode levar 30-60s na primeira vez)
echo.

set CONTADOR=0
:WAIT_LOOP
timeout /t 2 /nobreak >nul
set /a CONTADOR=%CONTADOR%+1
netstat -ano | findstr :3030 | findstr LISTENING >nul 2>&1
if %errorlevel%==0 (
  echo [OK] Dev server pronto apos %CONTADOR% verificacoes.
  REM Espera 3s extras pra primeira request nao falhar
  timeout /t 3 /nobreak >nul
  goto :OPEN_BROWSER
)
if %CONTADOR% GEQ 60 (
  echo.
  echo [ERRO] Dev server nao subiu em 2 minutos.
  echo Verifique a janela do terminal que abriu pra ver o erro.
  echo.
  pause
  exit /b 1
)
echo   tentativa %CONTADOR%/60...
goto :WAIT_LOOP

:OPEN_BROWSER
echo.
echo [...] Abrindo gerador no navegador...
start http://localhost:3030/admin/proposta

echo.
echo ============================================================
echo  Pronto! O gerador esta aberto no seu navegador.
echo.
echo  Para criar uma proposta:
echo    1. Preenche o form
echo    2. Clica "Gerar e publicar"
echo    3. Copia a URL e manda pro lead
echo.
echo  Esta janela pode ser fechada (a outra do dev nao).
echo ============================================================
echo.
timeout /t 5 /nobreak >nul
