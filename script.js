


document.addEventListener("DOMContentLoaded", function() {


//최신 버전 체커

    const versionChecker = {
        // 버전 정보를 가져와서 index.html에 표시하는 함수
        updateVersion: function() {
            fetch('current_version.txt')
                .then(response => response.text())
                .then(text => {
                    const versionInfo = this.parseVersionInfo(text.trim());
                    this.displayVersionInfo(versionInfo);
                })
                .catch(error => {
                    console.error('Error fetching the version info:', error);
                });
        },

        // 버전 정보를 파싱하는 함수
        parseVersionInfo: function(versionString) {
            // 버전 문자열을 '-' 문자로 분리하여 배열로 만듭니다
            const versionParts = versionString.split('-');
            
            // majorVersion은 첫 번째 부분입니다
            const majorVersion = versionParts[0];

            // date는 두 번째 부분의 마지막 부분입니다
            const dateParts = versionParts[1].split('1.');
            const date = dateParts.slice(1).join('.');

            return { majorVersion, date };
        },

        // 파싱된 버전 정보를 HTML로 표시하는 함수
        displayVersionInfo: function({ majorVersion, date }) {
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
        },

        // 최신 버전 비교 함수
        checkLatestVersion: function() {
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
                            const versionStatusNew = document.querySelector('.checkResultNew');
                            const versionStatusOld = document.querySelector('.checkResultOld');
                            const checkButton = document.getElementById('check-version-button');

                            if (currentVersion.trim() === latestVersion.trim()) {
                                versionStatusNew.style.display = 'block';
                                versionStatusOld.style.display = 'none';
                            } else {
                                versionStatusNew.style.display = 'none';
                                versionStatusOld.style.display = 'block';
                            }
                            checkButton.style.display = 'none';
                        })
                        .catch(error => {
                            console.error('Error fetching the latest releases:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching the current version:', error);
                });
        }
    };

    // 기능 초기화 함수 호출
    versionChecker.updateVersion();

    // 체크 버전 버튼에 이벤트 리스너 추가
    document.getElementById('check-version-button').addEventListener('click', function() {
        versionChecker.checkLatestVersion();
    });




    



});

