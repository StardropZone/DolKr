import os
from tabulate import tabulate

# 폴더 내 파일 목록을 가져오는 함수 (경로와 파일 이름 모두 저장)
def get_files_in_directory(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.relpath(os.path.join(root, file), directory)  # 상대 경로 생성
            file_list.append(file_path)  # 경로와 파일명 모두 리스트에 추가
    return set(file_list)  # 집합으로 반환하여 중복 제거

# A폴더와 B폴더 비교 함수
def compare_directories(dir_a, dir_b):
    print(f"Comparing directories:\nA: {dir_a}\nB: {dir_b}")
    
    files_a = get_files_in_directory(dir_a)  # A 폴더의 파일들
    files_b = get_files_in_directory(dir_b)  # B 폴더의 파일들

    # A에만 있는 파일 (추가된 파일)
    added_files = files_a - files_b
    
    # B에만 있는 파일 (삭제된 파일)
    deleted_files = files_b - files_a

    return added_files, deleted_files

# 첫 번째 파일은 폴더 경로를 표시하고 color1 적용, 나머지 파일들은 파일명만 표시하고 color2 적용
def format_file_list_with_colors(file_set):
    formatted_list = []
    current_folder = None
    for file in sorted(file_set):  # 정렬된 순서대로 처리
        folder_path = os.path.dirname(file)
        file_name = os.path.basename(file)
        if folder_path != current_folder:
            # 폴더가 변경되었을 때 폴더 경로를 출력 (color1 클래스)
            formatted_list.append((f"{folder_path}\\", "color1"))  
            formatted_list.append((file_name, "color2"))  # 해당 폴더의 첫 번째 파일 (color2)
            current_folder = folder_path
        else:
            # 같은 폴더 내의 파일들은 파일명만 출력 (color2)
            formatted_list.append((file_name, "color2"))
    return formatted_list

# 버전 정보 읽기 함수
def get_current_version(version_file_path):
    with open(version_file_path, 'r') as f:
        return f.read().strip()

# 경로 설정 (scripts 폴더에서 상위 폴더를 기준으로 설정)
script_dir = os.path.dirname(os.path.abspath(__file__))  # 현재 스크립트의 경로
workspace_path = os.getenv('GITHUB_WORKSPACE', os.path.abspath(os.path.join(script_dir, '..')))  # 최상위 폴더 설정

# 비교 실행
folder_a = os.path.join(workspace_path, 'DoLEn', 'img')  # A 폴더 경로
folder_b = os.path.join(workspace_path, 'custom', 'retexture', '0_vanilla')  # B 폴더 경로

# 경로 출력 (디버깅용)
print(f"Folder A path: {folder_a}")
print(f"Folder B path: {folder_b}")

added, deleted = compare_directories(folder_a, folder_b)

# 추가된 파일과 삭제된 파일 형식 변환
formatted_added = format_file_list_with_colors(added)
formatted_deleted = format_file_list_with_colors(deleted)

# 버전 정보 가져오기
version_file_path = os.path.join(workspace_path, 'scripts', 'current_version_En.txt')
current_version = get_current_version(version_file_path)

# HTML 테이블 생성
table_data = []
max_length = max(len(formatted_added), len(formatted_deleted))

for i in range(max_length):
    row = [
        f'<td class="{formatted_added[i][1]}">{formatted_added[i][0]}</td>' if i < len(formatted_added) else "<td></td>",
        f'<td class="{formatted_deleted[i][1]}">{formatted_deleted[i][0]}</td>' if i < len(formatted_deleted) else "<td></td>"
    ]
    table_data.append(row)

# HTML 생성 (외부 CSS 파일 적용)
html_content = f"""
<html>
<head>
    <title>Directory Comparison Results</title>
    <link rel="stylesheet" type="text/css" href="verImg.css">
</head>
<body>
    <h1>{current_version} 버전 이미지 변동 내역</h1>
    <table border="1">
        <thead>
            <tr><th>추가된 파일</th><th>삭제된 파일</th></tr>
        </thead>
        <tbody>
            {''.join(f'<tr>{row[0]}{row[1]}</tr>' for row in table_data)}
        </tbody>
    </table>
</body>
</html>
"""

# HTML 파일로 저장
html_file_path = os.path.join(workspace_path, 'scripts', 'verImgCompare.html')

with open(html_file_path, "w") as f:
    f.write(html_content)

print(f"HTML 파일로 저장되었습니다: {html_file_path}")
