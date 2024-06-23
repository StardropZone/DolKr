import sys
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def download_file(download_url):
    # Setup Chrome options
    chrome_options = Options()
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    # Setup Chrome driver
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    try:
        # Open the URL
        driver.get(download_url)
        
        # Wait for the page to load and the download button to be clickable
        wait = WebDriverWait(driver, 10)
        
        for attempt in range(20):
            try:
                download_button = wait.until(
                    EC.element_to_be_clickable((By.XPATH, "//button[span[text()='다운로드']]"))
                )
                download_button.click()
                print(f"Download started after {attempt + 1} attempts.")
                break
            except Exception as e:
                print(f"Attempt {attempt + 1} failed: {e}")
                time.sleep(10)
        else:
            print("Failed to start the download after 20 attempts.")
            return
        
        # Additional code to handle the downloaded file if necessary
        time.sleep(10)  # Wait for the download to complete (adjust as needed)
        
    finally:
        driver.quit()

if __name__ == "__main__":
    download_url = sys.argv[1] if len(sys.argv) > 1 else ""
    if download_url:
        download_file(download_url)
    else:
        print("No download URL provided.")
