import re
import os
import shutil
import sys

# 콘솔 인코딩을 UTF-8로 설정
sys.stdout.reconfigure(encoding='utf-8')

# 현재 스크립트의 디렉토리 경로
current_directory = os.path.dirname(os.path.abspath(__file__))
print(f"현재 스크립트의 경로: {current_directory}")

# 작업 폴더 경로 설정 - 뒤쪽 ''에 게임파일 들어있는 폴더명 입력
base_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'KrTrans'))

def modify_file(description, file_path, replacements):
    print(f"\n진행 단계: {description}")

    # 파일 경로를 기본 작업 폴더 경로와 결합
    full_file_path = os.path.join(base_directory, file_path.replace('/', os.sep))
    
    # 원본 파일 읽기
    try:
        with open(full_file_path, 'r', encoding='utf-8') as file:
            file_content = file.read()
    except FileNotFoundError:
        print(f"파일을 찾을 수 없습니다: {full_file_path}")
        return
    
    with open(full_file_path, 'r', encoding='utf-8') as file:
        file_content = file.read()

    # 여러 위치의 텍스트를 순차적으로 교체
    for original_text, modified_text in replacements:
        if original_text in file_content:
            print(f"텍스트를 찾았습니다:\n{original_text}")
            file_content = file_content.replace(original_text, modified_text)
        else:
            if modified_text in file_content:
                print(f"이미 수정된 텍스트입니다:\n{modified_text}")
            else:
                print(f"텍스트를 찾지 못했습니다:\n{original_text}")

    # 수정된 파일 저장
    with open(full_file_path, 'w', encoding='utf-8') as file:
        file.write(file_content)

    print(f"파일이 수정되었습니다: {file_path}")

def copy_file(description, src, dest):
    print(f"\n진행 단계: {description}")
    
    # 파일 경로를 결합하여 전체 경로 생성
    src_path = os.path.join(current_directory, src.replace('/', os.sep))
    dest_path = os.path.join(base_directory, dest.replace('/', os.sep))
    
    # 파일 복사
    try:
        shutil.copy2(src_path, dest_path)
        print(f"파일이 복사되었습니다: {dest}")
    except FileNotFoundError:
        print(f"파일을 찾을 수 없습니다: {src_path}")
    except Exception as e:
        print(f"파일 복사 중 오류 발생: {e}")

# 수정할 파일과 텍스트 쌍을 정의 (description, file_path, [(original_text, modified_text), ...])
replacements = [
    ("시작화면 warning 지우기", 
        'game/01-config/start.twee', 
        [
            (r'<<if _warningConfirm>><<settingsStart>><<else>><<koTransWarning>><</if>>', r'<<settingsStart>>')
        ]
    ),
    ("시작화면 warning 지우기", 
        'game/base-system/caption.twee',
        [
            (r'<<if _warningConfirm>><<startCaption>><<else>><<coveredStartCaption>><</if>>', r'<<startCaption>>')
        ]
    ),
    ("온도계 색깔 수정", 
        'game/03-JavaScript/weather/03-canvas/01-src/01-main/00-thermometer.js',
        [
            (r'''const color = {
		min: "#000dff",
		mid: "#00ff91",
		max: "#ff0000",
		warn: "#ddff00",
	};''', r'''const color = {
		min: "#000dff",
		mid: "#00ff91",
		max: "#ff0000",
		warn: "#ddff00",
	};''')
        ]
    ),
    ("스탯창 돈 아이콘 수정", 
        'game/base-system/widgets.twee',
        [
            (r'''"£"''', r'''"<span class='moneySymbol'>£</span>"''')
        ]
    ),
    ("작업단계", 
        'game/04-Variables/colours.js',
        [
            (r'#00d5ff', r'#abdcff')
        ]
    )
#   ,("작업단계", 
#         'modules/css/base.css(경로)',
#         [
#             (r'기존스크립트', r'교체스크립트')
#         ]
#     )
]

# 파일 복사 목록 정의 (source_path, destination_path)
copy_files = [
    ("캔버스 모델 수정", 'canvasmodel-main_custom.js', 'game/04-Variables/canvasmodel-main_custom.js'),
    ("ui 수정", 'z_customCSS.css', 'modules/css/z_customCSS.css')
    # 필요한 만큼 추가
    # ,("작업단계", '파일명', '작업폴더아래경로/파일명')
]

# 파일 내용 수정
for description, file_path, replacements_list in replacements:
    modify_file(description, file_path, replacements_list)

# 파일 복사 작업
for description, src, dest in copy_files:
    copy_file(description, src, dest)

print()
print()
print("SUCCESS")