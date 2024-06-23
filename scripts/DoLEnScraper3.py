import requests
import json

# Fetch the latest versions with download links
url = "https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json"
response = requests.get(url)
versions_info = response.json()

# Extract the latest stable version information
latest_stable_version_info = versions_info["channels"]["Stable"]
latest_stable_version = latest_stable_version_info["version"]
downloads = latest_stable_version_info["downloads"]

# Extract the Chrome and ChromeDriver download URLs for linux64
try:
    chrome_download_url = next(item for item in downloads if item["platform"] == "linux64" and item["artifact"] == "chrome")["url"]
    chromedriver_download_url = next(item for item in downloads if item["platform"] == "linux64" and item["artifact"] == "chromedriver")["url"]
except StopIteration:
    raise KeyError("No download URL found for linux64 platform")

# Print the results
print(f"CHROME_VERSION={latest_stable_version}")
print(f"CHROME_DOWNLOAD_URL={chrome_download_url}")
print(f"CHROMEDRIVER_DOWNLOAD_URL={chromedriver_download_url}")
