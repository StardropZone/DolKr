# import sys
# import time
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from webdriver_manager.chrome import ChromeDriverManager

# def download_file(url):
#     chrome_options = Options()
#     # chrome_options.add_argument("--headless")
#     chrome_options.add_argument("--no-sandbox")
#     chrome_options.add_argument("--disable-dev-shm-usage")
#     chrome_options.add_argument("--disable-gpu")
#     chrome_options.add_argument("--remote-debugging-port=9222")  # Add remote debugging port option

#     service = Service(ChromeDriverManager().install())
#     driver = webdriver.Chrome(service=service, options=chrome_options)
    
#     driver.get(url)

#     for attempt in range(20):
#         try:
#             download_button = WebDriverWait(driver, 10).until(
#                 EC.element_to_be_clickable((By.XPATH, "//button//span[text()='다운로드']"))
#             )
#             download_button.click()
#             break
#         except Exception as e:
#             print(f"Attempt {attempt + 1}: {e}")
#             if attempt == 19:
#                 raise Exception("Failed to download the file after 20 attempts.")
#             time.sleep(10)
    
#     time.sleep(10)  # Ensure the file download completes

#     driver.quit()

# if __name__ == "__main__":
#     download_url = sys.argv[1]
#     download_file(download_url)

import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

def download_file_from_mega(download_url, max_attempts=20, wait_time=5):
    attempt = 0
    while attempt < max_attempts:
        try:
            # ChromeDriver 설치 및 설정
            service = Service(ChromeDriverManager().install())
            options = webdriver.ChromeOptions()
            options.add_argument('--headless')  # 브라우저 창을 표시하지 않음
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            driver = webdriver.Chrome(service=service, options=options)

            # Mega URL로 이동
            driver.get(download_url)
            time.sleep(10)  # 페이지 로딩 대기

            # 다운로드 버튼 클릭
            download_button = driver.find_element(By.XPATH, '//*[@id="download-button"]')
            download_button.click()
            
            # 다운로드 완료 대기 (적절한 시간 설정 필요)
            time.sleep(120)  # 다운로드가 완료될 때까지 대기
            
            driver.quit()
            print("다운로드 성공.")
            return
        except Exception as e:
            print(f"{attempt + 1}번째 시도 실패: {e}")
            attempt += 1
            time.sleep(wait_time)
            driver.quit()
    raise Exception(f"{max_attempts}번 시도 후 파일 다운로드에 실패했습니다.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python DoLEnScraper2.py <download_url>")
        sys.exit(1)
    
    download_url = sys.argv[1]
    try:
        download_file_from_mega(download_url)
    except Exception as e:
        print(e)
