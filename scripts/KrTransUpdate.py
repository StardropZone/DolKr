import os
import shutil
from github import Github

# GitHub Actions에서 설정한 환경 변수 GITHUB_TOKEN 사용
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
g = Github(GITHUB_TOKEN)

# 원본 리포지토리와 내 리포지토리 정보
source_repo_name = 'uotalkie/dol-kr'
destination_repo_name = 'StardropZone/DolKr'
destination_folder = './KrTrans'

# 현재 적용된 버전을 확인하기 위한 파일
version_file_path = './KrTrans/KrVersionChecker.txt'

# GitHub 리포지토리 객체 생성
source_repo = g.get_repo(source_repo_name)
destination_repo = g.get_repo(destination_repo_name)

def get_latest_tag(repo):
    tags = repo.get_tags()
    latest_tag = tags[0]  # 최신 태그
    return latest_tag.name

def get_current_version():
    """버전 파일이 없으면 None을 반환하고, 있으면 현재 버전 정보를 반환"""
    if os.path.exists(version_file_path):
        with open(version_file_path, 'r') as f:
            return f.read().strip()  # 파일의 내용을 읽어서 버전 정보로 반환
    return None

def set_current_version(version):
    """현재 버전을 KrVersionChecker.txt에 저장"""
    with open(version_file_path, 'w') as f:
        f.write(version)  # 새로운 버전 정보를 파일에 기록

def get_changed_files_between_versions(repo, old_version, new_version):
    """두 버전 사이의 변경된 파일 목록을 가져옴"""
    comparison = repo.compare(old_version, new_version)
    changed_files = [file.filename for file in comparison.files]
    return changed_files

def copy_file(source_repo, file_path, destination_folder):
    """원본 리포지토리에서 파일을 복사해서 대상 폴더로 저장"""
    file_content = source_repo.get_contents(file_path)
    file_data = file_content.decoded_content

    # 목적 경로에 필요한 폴더 생성
    destination_path = os.path.join(destination_folder, file_path)
    os.makedirs(os.path.dirname(destination_path), exist_ok=True)

    # 파일 복사
    with open(destination_path, 'wb') as f:
        f.write(file_data)

def main():
    # 최신 태그 가져오기
    latest_tag = get_latest_tag(source_repo)
    
    # 현재 적용된 버전 확인
    current_version = get_current_version()

    # 만약 버전 파일이 없거나 (current_version이 None) 최신 버전과 다르면 업데이트 진행
    if current_version is None or current_version != latest_tag:
        print(f"새로운 버전 발견: {latest_tag}. 업데이트 진행 중...")

        # 변경된 파일 목록 가져오기
        if current_version is None:
            # 버전 파일이 없을 때는 전체 파일을 복사
            changed_files = [file.path for file in source_repo.get_contents('')]
        else:
            # 기존 버전과 최신 버전 사이의 변경된 파일을 가져옴
            changed_files = get_changed_files_between_versions(source_repo, current_version, latest_tag)

        # 변경된 파일 복사
        for file_path in changed_files:
            copy_file(source_repo, file_path, destination_folder)

        # 최신 버전을 KrVersionChecker.txt에 기록
        set_current_version(latest_tag)

        # 최신 태그를 GitHub Actions 환경 변수로 설정
        print(f"::set-output name=LATEST_TAG::{latest_tag}")
        print(f"업데이트 완료: {latest_tag}")
    else:
        print("최신 버전이 이미 적용되어 있습니다.")

if __name__ == "__main__":
    main()