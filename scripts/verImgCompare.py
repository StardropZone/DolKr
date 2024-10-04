import os
from tabulate import tabulate

# 폴더 내 파일 목록을 가져오는 함수
def get_files_in_directory(directory):
    file_dict = {}
    for root, dirs, files in os.walk(directory):
        for file in files:
            relative_path = os.path.relpath(os.path.join(root, file), directory)
            folder_path = os.path.dirname(relative_path)
            if folder_path not in file_dict:
                file_dict[folder_path] = []
            file_dict[folder_path].append(file)
    return file_dict

# A폴더와 B폴더 비교 함수
def compare_directories(dir_a, dir_b):
    files_a = get_files_in_directory(dir_a)
    files_b = get_files_in_directory(dir_b)

    added_files = {k: files_a[k] for k in files_a if k not in files_b or files_a[k] != files_b[k]}
    deleted_files = {k: files_b[k] for k in files_b if k not in files_a or files_a[k] != files_b[k]}

    return added_files, deleted_files

# 같은 폴더에서 파일명을 간소화하여 출력하는 함수
def format_file_list(file_dict):
    formatted_list = []
    for folder, files in file_dict.items():
        for i, file in enumerate(files):
            if i == 0:
                formatted_list.append(os.path.join(folder, file))  # 첫 번째 파일은 전체 경로
            else:
                formatted_list.append(file)  # 나머지는 파일명만 출력
    return formatted_list

# 버전 정보 읽기 함수
def get_current_version(version_file_path):
    with open(version_file_path, 'r') as f:
        return f.read().strip()

# 비교 실행
folder_a = os.path.join(os.getenv('GITHUB_WORKSPACE'), 'DoLEm/img')
folder_b = os.path.join(os.getenv('GITHUB_WORKSPACE'), 'custom/retexture/0_vanilla')

added, deleted = compare_directories(folder_a, folder_b)

# 추가된 파일과 삭제된 파일 형식 변환
formatted_added = format_file_list(added)
formatted_deleted = format_file_list(deleted)

# 버전 정보 가져오기
version_file_path = os.path.join(os.getenv('GITHUB_WORKSPACE'), 'scripts', 'current_version_En.txt')
current_version = get_current_version(version_file_path)

# 결과를 HTML 테이블로 출력
table_data = []
max_length = max(len(formatted_added), len(formatted_deleted))

for i in range(max_length):
    row = [
        formatted_added[i] if i < len(formatted_added) else "",
        formatted_deleted[i] if i < len(formatted_deleted) else ""
    ]
    table_data.append(row)

# HTML 테이블 생성
html_table = tabulate(table_data, headers=["추가된 파일", "삭제된 파일"], tablefmt="html")

# HTML 파일로 저장 (CSS는 외부 파일로 분리)
html_file_path = os.path.join(os.getenv('GITHUB_WORKSPACE'), 'scripts', 'verImgCompare.html')

with open(html_file_path, "w") as f:
    f.write(f"""
    <html>
    <head>
    <title>Directory Comparison Results</title>
    <link rel="stylesheet" type="text/css" href="verImg.css">
    </head>
    <body>
    <h1>{current_version} 버전 이미지 변동 내역</h1>
    {html_table}
    </body>
    </html>
    """)

print(f"HTML 파일로 저장되었습니다: {html_file_path}")
