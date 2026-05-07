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

echo [...] Iniciando dev server na porta 3030...
echo.
echo Uma janela do terminal vai abrir e ficar rodando.
echo NAO FECHE essa janela enquanto estiver gerando propostas.
echo.

cd /d "C:\Users\guiro\OneDrive\Documentos\Claude\apps\portfolio"
start "Portfolio Dev (porta 3030)" cmd /k "npx next dev -p 3030"

echo Aguardando 10 segundos para compilar...
timeout /t 10 /nobreak >nul

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
