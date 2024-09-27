import sys
import requests
from bs4 import BeautifulSoup

def get_latest_version():
    url = 'https://vrelnir.blogspot.com/'
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to access {url}")
        return ""

    soup = BeautifulSoup(response.content, 'html.parser')
    versions = []
    download_links = []
    
    # <aside> 태그 안의 <a> 태그를 찾기
    for aside in soup.find_all('aside'):
        for a in aside.find_all('a'):
            text = a.text.strip()
            if "Degrees of Lewdity" in text:
                # 버전 넘버를 추출하고 해당 href를 저장
                try:
                    version = text.split()[-1]  # "Degrees of Lewdity X.X.X.X" 형식에서 마지막 부분을 버전으로 추출
                    versions.append(version)
                    download_links.append(a['href'])  # href 속성을 다운로드 링크로 저장
                except Exception as e:
                    print(f"Error parsing version from text '{text}': {e}")
    
    # 최신 버전을 찾아 해당하는 다운로드 링크를 반환
    if versions:
        latest_version = sorted(versions, key=lambda v: [int(x) for x in v.split('.')], reverse=True)[0]
        latest_index = versions.index(latest_version)
        return latest_version, download_links[latest_index]  # 최신 버전과 해당 다운로드 링크 반환
    
    return "", ""

if __name__ == "__main__":
    # 최신 버전 확인
    latest_version, download_link = get_latest_version()
    if not latest_version:
        print("No version found.")
        sys.exit(1)

    # 최신 버전 출력
    print(f"New version found: {latest_version}")
    print(f"Download link: {download_link}")
