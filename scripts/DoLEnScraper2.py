import sys
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

def download_file(download_url):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_experimental_option('prefs', {
        "download.default_directory": "/github/workspace", # GitHub Actions의 작업 디렉토리로 설정
        "download.prompt_for_download": False,
    })
    
    service = Service('/usr/local/bin/chromedriver')
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    driver.get(download_url)
    
    try:
        download_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, "//button[span[text()='다운로드']]"))
        )
        download_button.click()
        
        # 파일 다운로드를 위한 대기 시간 설정
        time.sleep(30)  # 상황에 맞게 대기 시간을 조절합니다.
        
    finally:
        driver.quit()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python scripts/DoLEnScraper2.py <download_url>")
        sys.exit(1)
    
    download_url = sys.argv[1]
    download_file(download_url)
