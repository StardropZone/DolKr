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

import time
import requests

def download_file(url, max_attempts=20, wait_time=5):
    attempt = 0
    while attempt < max_attempts:
        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()  # 요청이 성공했는지 확인
            with open('downloaded_file', 'wb') as f:
                f.write(response.content)
            print("다운로드 성공.")
            return
        except requests.exceptions.RequestException as e:
            print(f"{attempt + 1}번째 시도 실패: {e}")
            attempt += 1
            time.sleep(wait_time)
    raise Exception(f"{max_attempts}번 시도 후 파일 다운로드에 실패했습니다.")

download_url = "YOUR_DOWNLOAD_URL_HERE"

try:
    download_file(download_url)
except Exception as e:
    print(e)
