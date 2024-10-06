document.addEventListener("DOMContentLoaded", () => {
    const versionCheckerDiv = document.getElementById('versionChecker');
    const updateStatusDiv = document.getElementById('updateStatus');

    // GitHub Pages에서 실행되는지 확인 (URL이 GitHub Pages의 도메인일 경우)
    const isGitHubPages = window.location.hostname.endsWith("github.io");

    // GitHub Pages와 로컬 환경에 따른 base URL 설정
    const baseURL = isGitHubPages ? window.location.origin : "";

    // 서버에서 파일 내용을 가져오는 함수
    async function fetchVersion(filePath) {
        try {
            const response = await fetch(`${baseURL}${filePath}`);
            if (response.ok) {
                return response.text();
            } else {
                console.error(`Error fetching ${filePath}: ${response.statusText}`);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching ${filePath}:`, error);
            return null;
        }
    }

    // 버전들을 읽고 비교하는 함수
    async function compareVersions() {
        const version1 = await fetchVersion('/scripts/current_version_En.txt');
        const version2Full = await fetchVersion('/scripts/current_version_Kr.txt');
        const version3Full = await fetchVersion('/scripts/KrVersionChecker.txt');

        if (!version1 || !version2Full || !version3Full) {
            updateStatusDiv.innerText = "버전 정보를 가져오는 데 실패했습니다.";
            return;
        }

        // 버전1 표시 (현재 버전)
        versionCheckerDiv.innerText = `현재 버전(A): ${version1.trim()}`;

        // 버전2와 버전3의 버전 넘버만 추출
        const version2 = version2Full.split('-')[0];
        const version3 = version3Full.split('-')[0];

        // 버전2와 버전3을 비교하여 업데이트 여부 확인
        if (version2Full.trim() === version3Full.trim()) {
            updateStatusDiv.innerText = `현재 버전(B): ${version2.trim()}`;
        } else {
            updateStatusDiv.innerText = `현재 버전(B): ${version2.trim()} - 업데이트가 존재합니다.`;
        }
    }

    // 페이지 로드 후 버전 비교 실행
    compareVersions();
});
