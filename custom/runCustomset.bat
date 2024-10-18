@echo off

REM Step 1: 코드 페이지를 UTF-8로 설정
chcp 65001

REM Step 2: Python 실행 경로 설정 (시스템 PATH에 추가된 경우 'python'으로 설정)
set PYTHON_PATH=python

REM Step 3: 현재 배치파일의 경로는 custom 폴더이므로, 따로 이동할 필요 없음

REM Step 4: delayed expansion 설정
setlocal enabledelayedexpansion

REM Step 5: Python 스크립트 실행 및 로그 저장
(
    set SCRIPT_PATH1=customset.py
    echo 실행 중: ui수정 스크립트 !SCRIPT_PATH1!
    %PYTHON_PATH% !SCRIPT_PATH1!
) > customPatchLog.txt 2>&1

REM Step 6: Python 스크립트 성공 여부 확인

REM customPatchLog.txt의 내용을 확인
echo 실행 완료. 로그 확인:
type customPatchLog.txt

REM "SUCCESS" 문자열이 있는지 직접 검색
findstr /i "SUCCESS" customPatchLog.txt >nul
if %errorlevel%==0 (
    echo customset.py 실행이 성공했습니다.
) else (
    echo [ERROR] customset.py 실행이 실패했습니다.
    exit /b 1
)

REM Step 7: KrTrans 폴더로 이동하여 Tweego 컴파일 실행
cd /d "%~dp0..\KrTrans"

:: Set working directory for Tweego
pushd "%~dp0..\KrTrans"
@set TWEEGO_PATH="%~dp0..\KrTrans\devTools\tweego\StoryFormats"

:: 컴파일된 HTML 파일명을 원하는 이름으로 설정
set "output_html=DoLKr.html"

echo Type 1: 컴파일을 시작합니다.
:: Run the appropriate compiler for the user's CPU architecture.
if %PROCESSOR_ARCHITECTURE% == AMD64 (
    CALL "%~dp0..\KrTrans\devTools\tweego\tweego_win64.exe" -f sugarcube-2-ko -o "%~dp0..\KrTrans\%output_html%" --head "%~dp0..\KrTrans\devTools\head.html" "%~dp0..\KrTrans\game" --module "%~dp0..\KrTrans\modules"
) else (
    CALL "%~dp0..\KrTrans\devTools\tweego\tweego_win86.exe" -f sugarcube-2-ko -o "%~dp0..\KrTrans\%output_html%" --head "%~dp0..\KrTrans\devTools\head.html" "%~dp0..\KrTrans\game" --module "%~dp0..\KrTrans\modules"
)

REM Step 8: 생성된 HTML 파일을 목표 폴더로 이동
echo 생성된 파일을 이동합니다.
move /y "%~dp0..\KrTrans\%output_html%" "%~dp0..\DoL\setA\%output_html%"
@REM copy /y "%~dp0..\DoL\setA\%output_html%" "%~dp0..\DoL\setD\%output_html%"

REM Step 9: canvasmodel-main_custom.js 파일 삭제 및 두 번째 컴파일 실행
echo 팔 레이어 커스텀 파일을 삭제합니다.
del "%~dp0..\KrTrans\game\04-Variables\canvasmodel-main_custom.js"

echo Type 2: 컴파일을 시작합니다.
if %PROCESSOR_ARCHITECTURE% == AMD64 (
    CALL "%~dp0..\KrTrans\devTools\tweego\tweego_win64.exe" -f sugarcube-2-ko -o "%~dp0..\KrTrans\%output_html%" --head "%~dp0..\KrTrans\devTools\head.html" "%~dp0..\KrTrans\game" --module "%~dp0..\KrTrans\modules"
) else (
    CALL "%~dp0..\KrTrans\devTools\tweego\tweego_win86.exe" -f sugarcube-2-ko -o "%~dp0..\KrTrans\%output_html%" --head "%~dp0..\KrTrans\devTools\head.html" "%~dp0..\KrTrans\game" --module "%~dp0..\KrTrans\modules"
)

echo 생성된 파일을 이동합니다.
if exist "%~dp0..\DoL\setB\%output_html%" del "%~dp0..\DoL\setB\%output_html%"
move /y "%~dp0..\KrTrans\%output_html%" "%~dp0..\DoL\setB\%output_html%"
@REM copy /y "%~dp0..\DoL\setC\%output_html%" "%~dp0..\DoL\setC\%output_html%"

REM Step 10: KrVersionChecker.txt의 내용을 current_version_Kr.txt에 덮어쓰기
echo current_version_Kr를 갱신합니다.
copy /y "%~dp0..\scripts\KrVersionChecker.txt" "%~dp0..\scripts\current_version_Kr.txt"

REM 작업 완료
echo 작업이 완료되었습니다.

pause
