import requests

# Fetch the latest version information from the Chrome for Testing JSON API
response = requests.get("https://googlechromelabs.github.io/chrome-for-testing/latest-versions-per-milestone-with-downloads.json")
versions_info = response.json()

# Print the API response to understand its structure
print(versions_info)

# Get the latest stable ChromeDriver version
latest_version_info = versions_info["milestones"]["Stable"]

latest_chrome_version = latest_version_info["version"]
downloads = latest_version_info["downloads"]

# Find the download URL for the Linux 64-bit platform
download_url = None
for download in downloads["chromedriver"]:
    if download["platform"] == "linux64":
        download_url = download["url"]
        break

if download_url is None:
    raise KeyError("No ChromeDriver download URL found for linux64 platform")

# Output the results
print(f"Latest Chrome Version: {latest_chrome_version}")
print(f"ChromeDriver Download URL: {download_url}")
