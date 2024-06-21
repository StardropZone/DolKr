
//최신 버전 체커

document.addEventListener("DOMContentLoaded", function() {
    // 버전 정보를 가져와서 index.html에 표시하는 함수
    function updateVersion() {
        fetch('current_version.txt')
            .then(response => response.text())
            .then(text => {
                const versionInfo = parseVersionInfo(text.trim());
                displayVersionInfo(versionInfo);
            })
            .catch(error => {
                console.error('Error fetching the version info:', error);
            });
    }

    // 버전 정보를 파싱하는 함수
    function parseVersionInfo(versionString) {
        const [version, date] = versionString.split('-');
        const [majorVersion, minorChange] = version.split('-0');
        return { majorVersion, date };
    }

    // 파싱된 버전 정보를 HTML로 표시하는 함수
    function displayVersionInfo({ majorVersion, date }) {
        const versionInfoContainer = document.getElementById('version-info');
        versionInfoContainer.innerHTML = '';

        const majorVersionElement = document.createElement('span');
        majorVersionElement.textContent = majorVersion;
        majorVersionElement.classList.add('major-version');

        const dateElement = document.createElement('span');
        dateElement.textContent = ` (${date})`;
        dateElement.classList.add('release-date');

        versionInfoContainer.appendChild(majorVersionElement);
        versionInfoContainer.appendChild(dateElement);
    }

    // 최신 버전 비교 함수
    function checkLatestVersion() {
        fetch('current_version.txt')
            .then(response => response.text())
            .then(currentVersion => {
                fetch('https://api.github.com/repos/uotalkie/dol-kr/releases')
                    .then(response => response.json())
                    .then(releases => {
                        if (releases.length === 0) {
                            console.error('No releases found');
                            return;
                        }
                        const latestRelease = releases[0]; // 최신 릴리스를 가져옵니다
                        const latestVersion = latestRelease.name; // 최신 릴리스의 제목을 가져옵니다
                        const versionStatus = document.getElementById('version-status');
                        if (currentVersion.trim() === latestVersion.trim()) {
                            versionStatus.textContent = "최신 버전입니다.";
                        } else {
                            versionStatus.textContent = "업데이트가 존재합니다.";
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching the latest releases:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching the current version:', error);
            });
    }

    // 기능 초기화 함수 호출
    updateVersion();

    // 체크 버전 버튼에 이벤트 리스너 추가
    document.getElementById('check-version-button').addEventListener('click', checkLatestVersion);
});




