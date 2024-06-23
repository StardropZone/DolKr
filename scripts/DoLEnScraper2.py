import sys
import subprocess

def download_file_from_mega(download_url, output_filename):
    # Mega CLI 명령어 실행
    command = f"megadl --path {output_filename} {download_url}"
    try:
        subprocess.run(command, shell=True, check=True)
        print("다운로드 성공.")
    except subprocess.CalledProcessError as e:
        print(f"다운로드 실패: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python DoLEnScraper2.py <download_url> <output_filename>")
        sys.exit(1)
    
    download_url = sys.argv[1]
    output_filename = sys.argv[2]
    download_file_from_mega(download_url, output_filename)
