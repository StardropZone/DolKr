document.addEventListener("DOMContentLoaded", function() {
    // 버전 정보를 가져와서 index.html에 표시하는 함수
    function updateVersion() {
        fetch('current_version.txt')
            .then(response => response.text())
            .then(text => {
                document.getElementById('version-info').textContent = "Current Version: " + text;
            })
            .catch(error => {
                console.error('Error fetching the version info:', error);
            });
    }

    // 최신 버전 비교 함수
    function checkLatestVersion() {
        fetch('current_version.txt')
            .then(response => response.text())
            .then(currentVersion => {
                fetch('https://api.github.com/repos/uotalkie/dol-kr/releases/latest')
                    .then(response => response.json())
                    .then(latestRelease => {
                        const latestVersion = latestRelease.name;
                        const versionStatus = document.getElementById('version-status');
                        if (currentVersion.trim() === latestVersion) {
                            versionStatus.textContent = "최신 버전입니다.";
                        } else {
                            versionStatus.textContent = "업데이트가 존재합니다.";
                            showUpdateButton();
                        }
                    });
            })
            .catch(error => {
                console.error('Error fetching the version info:', error);
            });
    }

    // 업데이트 버튼 표시 함수
    function showUpdateButton() {
        const updateButton = document.createElement('button');
        updateButton.textContent = "업데이트 진행";
        updateButton.onclick = triggerUpdateWorkflow;
        document.getElementById('version-status').appendChild(updateButton);
    }

// 업데이트 자동화 워크플로우 트리거 함수
function triggerUpdateWorkflow() {
    fetch('https://api.github.com/repos/StardropZone/DolKr/actions/workflows/update.yml/dispatches', {
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': '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' // 여기에 Personal Access Token을 입력하세요
        },
        body: JSON.stringify({
            "ref": "main"
        })
    })
    .then(response => {
        const updateStatus = document.createElement('p');
        if (response.ok) {
            updateStatus.textContent = "업데이트 완료!";
        } else {
            updateStatus.textContent = "업데이트 실패...";
        }
        document.getElementById('version-status').appendChild(updateStatus);
    })
    .catch(error => {
        console.error('Error triggering the update workflow:', error);
        const updateStatus = document.createElement('p');
        updateStatus.textContent = "업데이트 실패...";
        document.getElementById('version-status').appendChild(updateStatus);
    });
}

    // 기능 초기화 함수 호출
    updateVersion();

    // 체크 버전 버튼에 이벤트 리스너 추가
    document.getElementById('check-version-button').addEventListener('click', checkLatestVersion);
});
