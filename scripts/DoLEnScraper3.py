import requests
import json

# URL to fetch the last known good versions with downloads
url = "https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json"

# Fetch the data from the URL
response = requests.get(url)
data = response.json()

# Extract the latest version information
stable_version_info = data["channels"]["Stable"]
latest_version = stable_version_info["version"]

# Extract the download URLs for Chrome and ChromeDriver
downloads = stable_version_info["downloads"]
chrome_download_url = downloads["chrome"]["linux64"]
chromedriver_download_url = downloads["chromedriver"]["linux64"]

# Output the latest version and download URLs
print(f"Latest Chrome Version: {latest_version}")
print(f"Chrome Download URL: {chrome_download_url}")
print(f"ChromeDriver Download URL: {chromedriver_download_url}")
