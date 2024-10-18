@echo off
REM 코드 페이지를 UTF-8로 설정
chcp 65001

REM Python 실행 경로 설정 (시스템 PATH에 Python이 추가되어 있다고 가정)
set PYTHON_PATH=python

@echo off
REM 파이썬 스크립트를 실행합니다.
%PYTHON_PATH% customretexture.py

REM 실행 완료 후 메시지를 출력합니다.
echo 리텍스쳐 적용이 완료되었습니다.
pause
