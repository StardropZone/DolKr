import os
import requests
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
    """원본 리포지토리에서 최신 태그 가져오기"""
    tags = repo.get_tags()
    latest_tag = tags[0]  # 최신 태그
    return latest_tag.name

def get_current_version():
    """내 리포지토리에서 KrVersionChecker.txt 파일을 읽어 현재 버전을 확인"""
    try:
        contents = destination_repo.get_contents(version_file_path)
        return contents.decoded_content.decode('utf-8').strip()
    except:
        return None

def set_current_version(version):
    """내 리포지토리에 KrVersionChecker.txt 파일로 현재 버전을 기록 (태그 제목만)"""
    try:
        contents = destination_repo.get_contents(version_file_path)
        destination_repo.update_file(contents.path, f"업데이트 버전: {version}", version, contents.sha)
    except:
        destination_repo.create_file(version_file_path, f"최초 버전 기록: {version}", version)

def get_changed_files_between_versions(repo, old_version, new_version):
    """두 버전 사이의 변경된 파일 목록을 가져옴"""
    comparison = repo.compare(old_version, new_version)
    changed_files = [file.filename for file in comparison.files]
    return changed_files

def copy_file(source_repo, file_path, destination_repo, destination_folder):
    """원본 리포지토리에서 변경된 파일을 다운로드한 후, 내 리포지토리의 특정 경로로 복사"""
    content = source_repo.get_contents(file_path)
    
    # download_url로 파일 다운로드
    download_url = content.download_url
    if not download_url:
        print(f"파일을 다운로드할 수 없습니다: {file_path}")
        return

    # 파일 다운로드
    response = requests.get(download_url)
    response.raise_for_status()  # 다운로드에 실패하면 예외 발생

    # 사용자의 리포지토리 내 특정 경로로 파일 복사
    destination_path = f"{destination_folder}/{file_path}"  # 지정한 경로 내에 복사
    try:
        contents = destination_repo.get_contents(destination_path)
        destination_repo.update_file(contents.path, f"업데이트된 파일: {file_path}", response.content.decode('utf-8'), contents.sha)
    except:
        destination_repo.create_file(destination_path, f"새 파일 생성: {file_path}", response.content.decode('utf-8'))

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

        # 변경된 파일만 내 리포지토리의 특정 경로로 복사
        for file_path in changed_files:
            copy_file(source_repo, file_path, destination_repo, destination_folder)

        # 최신 태그 제목만 KrVersionChecker.txt에 기록
        set_current_version(latest_tag)
        print(f"업데이트 완료: {latest_tag}")
    else:
        print("최신 버전이 이미 적용되어 있습니다.")

if __name__ == "__main__":
    main()