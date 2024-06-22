import sys
import requests
from bs4 import BeautifulSoup

def get_download_link(version):
    url = 'https://vrelnir.blogspot.com/'
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to access {url}")
        return ""

    soup = BeautifulSoup(response.content, 'html.parser')
    for aside in soup.find_all('aside'):
        for a in aside.find_all('a'):
            if f"Degrees of Lewdity {version}" in a.text:
                return a['href']
    return ""

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python scripts/DoLEnScraper.py <version>")
        sys.exit(1)
    
    version = sys.argv[1]
    download_link = get_download_link(version)
    print(f"::set-output name=download_link::{download_link}")
