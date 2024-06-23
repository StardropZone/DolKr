import requests
import json

# URL to fetch the known-good versions with downloads
url = "https://googlechromelabs.github.io/chrome-for-testing/known-good-versions-with-downloads.json"

# Fetch the JSON data
response = requests.get(url)
data = response.json()

# Extract the latest version information
latest_version_info = data["versions"][0]
chrome_version = latest_version_info["version"]
downloads = latest_version_info["downloads"]

# Extract the ChromeDriver download URL for Linux 64-bit
chromedriver_url = None
if "chromedriver" in downloads:
    for download in downloads["chromedriver"]:
        if download["platform"] == "linux64":
            chromedriver_url = download["url"]
            break

# Check if chromedriver_url was found
if chromedriver_url is None:
    raise KeyError("No ChromeDriver download URL found for linux64 platform")

# Print the extracted information
print(f"Latest Chrome Version: {chrome_version}")
print(f"ChromeDriver Download URL: {chromedriver_url}")
