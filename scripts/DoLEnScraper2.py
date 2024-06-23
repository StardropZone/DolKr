import sys
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def download_file(url):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.binary_location = "/usr/local/bin/google-chrome"
    
    service = Service("/usr/local/bin/chromedriver")
    
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    driver.get(url)
    
    # Wait for the download button to appear
    try:
        download_button = WebDriverWait(driver, 120).until(
            EC.presence_of_element_located((By.XPATH, "//button//span[text()='다운로드']"))
        )
        download_button.click()
        time.sleep(60)  # Wait for the download to complete (adjust as necessary)
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    download_url = sys.argv[1]
    download_file(download_url)
