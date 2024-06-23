import requests
from bs4 import BeautifulSoup

# URL to fetch the latest version information
url = "https://googlechromelabs.github.io/chrome-for-testing/"

# Send a GET request to the URL
response = requests.get(url)
response.raise_for_status()

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, "html.parser")

# Extract the latest version number and revision from the "Stable" section
stable_section = soup.find("h2", text="Stable").find_next("p")
latest_version = stable_section.find("code").text
revision = stable_section.find_all("code")[1].text

# Generate the download URLs
chrome_download_url = f"https://storage.googleapis.com/chrome-for-testing-public/{latest_version}/linux64/chrome-linux64.zip"
chromedriver_download_url = f"https://storage.googleapis.com/chrome-for-testing-public/{latest_version}/linux64/chromedriver-linux64.zip"

# Print the results
print(f"CHROME_VERSION={latest_version}")
print(f"CHROME_DOWNLOAD_URL={chrome_download_url}")
print(f"CHROMEDRIVER_DOWNLOAD_URL={chromedriver_download_url}")
