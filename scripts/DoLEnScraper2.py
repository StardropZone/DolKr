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




