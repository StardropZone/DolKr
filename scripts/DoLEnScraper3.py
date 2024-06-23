# import requests
# from bs4 import BeautifulSoup

# # URL to fetch the latest version information
# url = "https://googlechromelabs.github.io/chrome-for-testing/"

# # Send a GET request to the URL
# response = requests.get(url)
# response.raise_for_status()

# # Parse the HTML content using BeautifulSoup
# soup = BeautifulSoup(response.content, "html.parser")

# # Extract the latest version number and revision from the "Stable" section
# stable_section = soup.find("h2", text="Stable").find_next("p")
# latest_version = stable_section.find("code").text
# revision = stable_section.find_all("code")[1].text

# # Generate the download URLs
# chrome_download_url = f"https://storage.googleapis.com/chrome-for-testing-public/{latest_version}/linux64/chrome-linux64.zip"
# chromedriver_download_url = f"https://storage.googleapis.com/chrome-for-testing-public/{latest_version}/linux64/chromedriver-linux64.zip"

# # Print the results
# print(f"CHROME_VERSION={latest_version}")
# print(f"CHROME_DOWNLOAD_URL={chrome_download_url}")
# print(f"CHROMEDRIVER_DOWNLOAD_URL={chromedriver_download_url}")

import requests
import json

# 최신 버전 정보가 포함된 JSON 파일을 다운로드
response = requests.get("https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json")
versions_info = response.json()

# 안정 채널(Stable)의 최신 버전 정보 추출
latest_version_info = versions_info["channels"]["Stable"]["version"]
downloads = versions_info["channels"]["Stable"]["downloads"]

# 안정 버전에 해당하는 Chrome 및 ChromeDriver 다운로드 URL 추출
try:
    chrome_download_url = downloads["chrome-linux64"]["url"]
except KeyError:
    raise KeyError("No Chrome download URL found for linux64 platform")

try:
    chromedriver_download_url = downloads["chromedriver-linux64"]["url"]
except KeyError:
    raise KeyError("No ChromeDriver download URL found for linux64 platform")

# 최신 버전 및 다운로드 URL을 출력
print(f"CHROME_VERSION={latest_version_info}")
print(f"CHROME_DOWNLOAD_URL={chrome_download_url}")
print(f"CHROMEDRIVER_DOWNLOAD_URL={chromedriver_download_url}")
