import os
import shutil


# 파일 경로 설정
en_version_file = "../scripts/current_version_En.txt"
kr_version_file = "../scripts/current_version_Kr.txt"
dole_img_folder = "../DoLEn/img"
vanilla_folder = "../custom/retexture/0_vanilla"

# Helper function: Kr 파일에서 버전 넘버 추출
def extract_kr_version(version_text):
    return version_text.split('-')[0]

# Helper function: 대상 폴더 초기화 후 복사
def clear_and_copy(src, dest):
    print(f"{src}에서 {dest}로 파일 복사를 시작합니다.")
    if os.path.exists(dest):
        print(f"{dest} 폴더 내 기존 파일을 삭제 중입니다.")
        shutil.rmtree(dest)  # 대상 폴더 내 기존 파일 삭제
    shutil.copytree(src, dest)  # 폴더 구조를 유지한 채 복사
    print(f"{src}에서 {dest}로 파일 복사가 완료되었습니다.")

# 버전 파일 읽기
def read_version(file_path):
    print(f"버전 정보를 읽는 중입니다.")
    with open(file_path, 'r') as f:
        return f.read().strip()

# 메인 함수
def manage_files():
    try:
        print("setA 업데이트 시작")
        en_version = read_version(en_version_file)
        kr_version_full = read_version(kr_version_file)
        kr_version = extract_kr_version(kr_version_full)

        # 버전 비교
        if en_version == kr_version:
            print("vanilla 폴더를 업데이트 합니다.")
            clear_and_copy(dole_img_folder, vanilla_folder)
        else:
            print("vanilla 폴더 업데이트를 생략합니다.")

        # retexture 내의 여러 폴더에서 DoL/setA/img 폴더로 복사
        print("setA로 파일 복사를 시작합니다.")
        target_folders = ["0_vanilla", "1_base", "2_custom"]
        destination_folder = "../DoL/setA/img"

        if os.path.exists(destination_folder):
            print(f"{destination_folder} : 기존 파일을 삭제 중입니다.")
            shutil.rmtree(destination_folder)  # 대상 폴더 내 기존 파일 삭제

        os.makedirs(destination_folder, exist_ok=True)

        # 폴더명 순으로 복사하여 덮어쓰기
        for folder in target_folders:
            src = f"../custom/retexture/{folder}"
            print(f"{src} 복사 중...")
            for root, dirs, files in os.walk(src):
                for file in files:
                    rel_path = os.path.relpath(root, src)
                    dest_path = os.path.join(destination_folder, rel_path)
                    os.makedirs(dest_path, exist_ok=True)
                    shutil.copy(os.path.join(root, file), dest_path)
            print(f"{src} 복사 완료")

        print("setA 설정이 완료되었습니다.")

    except Exception as e:
        print(f"오류가 발생했습니다: {e}")


# 주석 처리된 추가 수정용 코드 예시 (추후 사용을 위해 추가 조합 작성)
"""
try:
    print("setB 업데이트 시작.")

    target_folders = ["0_vanilla", "3_custom2"]
    destination_folder = "../DoL/setB/img"

    if os.path.exists(destination_folder):
        print(f"{destination_folder} : 기존 파일을 삭제 중입니다."")
        shutil.rmtree(destination_folder)

    os.makedirs(destination_folder, exist_ok=True)

    for folder in target_folders:
        src = f"../custom/retexture/{folder}"
        print(f"{src} 복사 중...")
        for root, dirs, files in os.walk(src):
            for file in files:
                rel_path = os.path.relpath(root, src)
                dest_path = os.path.join(destination_folder, rel_path)
                os.makedirs(dest_path, exist_ok=True)
                shutil.copy(os.path.join(root, file), dest_path)
        print(f"{src} 복사 완료")

    print("setB 설정이 완료되었습니다.")

except Exception as e:
    print(f"오류가 발생했습니다: {e}")
"""

# 실행
if __name__ == "__main__":
    manage_files()