document.addEventListener("DOMContentLoaded", () => {
    // 모달 열기/닫기 기능
    const saveModal = document.getElementById("saveModal");
    const retextureModal = document.getElementById("retextureModal");
    const saveModalClose = document.getElementsByClassName("close")[0];
    const retextureModalClose = document.getElementsByClassName("close-retexture")[0];

    const manageSavesBtn = document.getElementById("manageSavesBtn");
    const retextureBtn = document.getElementById("retextureBtn");

    const startGameLink = document.getElementById("startGameLink");

    const serverUrl = 'https://savedata-for-personaluse.glitch.me';

    // 세이브 관리 모달 열기
    manageSavesBtn.addEventListener("click", () => {
        saveModal.style.display = "block";
        updateBackupList();
    });

    // 리텍스쳐 모달 열기
    retextureBtn.addEventListener("click", () => {
        retextureModal.style.display = "block";
    });

    // 모달 닫기
    saveModalClose.addEventListener("click", () => {
        saveModal.style.display = "none";
    });

    retextureModalClose.addEventListener("click", () => {
        retextureModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == saveModal) {
            saveModal.style.display = "none";
        } else if (event.target == retextureModal) {
            retextureModal.style.display = "none";
        }
    });

    // 리텍스쳐 버튼 기능
    document.getElementById("preset1").addEventListener("click", () => {
        startGameLink.href = "DoL/setA/DoLKr.html";
        showToast("프리셋1이 적용되었습니다", "toast-retexture", () => {
            retextureModal.style.display = "none";
        });
    });

    document.getElementById("preset2").addEventListener("click", () => {
        startGameLink.href = "#";
        showToast("준비중", "toast-retexture", () => {
            retextureModal.style.display = "none";
        });
    });

    document.getElementById("preset3").addEventListener("click", () => {
        startGameLink.href = "#";
        showToast("준비중", "toast-retexture", () => {
            retextureModal.style.display = "none";
        });
    });

    document.getElementById("preset4").addEventListener("click", () => {
        startGameLink.href = "DoLEn/DoLEn.html";
        showToast("프리셋4가 적용되었습니다", "toast-retexture", () => {
            retextureModal.style.display = "none";
        });
    });

    // 클립보드에서 데이터를 가져와 저장하는 함수
    function saveClipboardData() {
        navigator.clipboard.readText().then(text => {
            const comment = document.getElementById("commentInput").value;
            saveToServer({ latestSaveData: text, latestSaveComment: comment }, () => {
                document.getElementById("latestSaveComment").innerText = comment || "No comment";
                showToast("Save data saved successfully!", "toast");
            });
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    }

    // 서버로 데이터를 저장하는 함수
    function saveToServer(newData, callback) {
        // 먼저 서버에서 기존 데이터를 불러옴
        loadFromServer(existingData => {
            // 기존 데이터와 새로운 데이터를 병합
            const updatedData = { ...existingData, ...newData };
            
            // 병합된 데이터를 서버에 저장
            fetch(`${serverUrl}/save-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to save data to server');
            })
            .then(callback)
            .catch(err => console.error(err.message));
        });
    }
    

    // 서버에서 데이터를 가져오는 함수
    function loadFromServer(callback) {
        fetch(`${serverUrl}/load-data`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load data from server');
        })
        .then(data => {
            callback(data);
        })
        .catch(err => console.error(err.message));
    }

    // Latest Save를 불러오는 함수
    function loadLatestSave() {
        loadFromServer(data => {
            if (data.latestSaveData) {
                navigator.clipboard.writeText(data.latestSaveData).then(() => {
                    showToast("Latest save data copied to clipboard!", "toast");
                }).catch(err => {
                    console.error('Failed to write to clipboard: ', err);
                });
            } else {
                showToast("No latest save data found!", "toast");
            }
        });
    }

    // 백업 슬롯 선택 모달 표시
    function showBackupSlots() {
        let slots = '';
        for (let i = 1; i <= 20; i++) {
            slots += `<div class="button" onclick="backupLatestSave(${i})">Slot ${i}</div>`;
        }
        document.getElementById('backupList').innerHTML = slots;
    }

    // Latest Save를 백업하는 함수
    window.backupLatestSave = function(slot) {
        loadFromServer(data => {
            const latestSaveData = data.latestSaveData;
            const latestSaveComment = data.latestSaveComment;
            if (!latestSaveData) {
                showToast("No latest save data to backup!", "toast");
                return;
            }

            data[`backupSaveData_${slot}`] = latestSaveData;
            data[`backupSaveComment_${slot}`] = latestSaveComment;

            saveToServer(data, () => {
                updateBackupList();
                showToast(`Latest save data backed up to slot ${slot}!`, "toast");
            });
        });
    }

    // 백업 리스트를 업데이트하는 함수
    function updateBackupList() {
        loadFromServer(data => {
            const backupList = document.getElementById("backupList");
            backupList.innerHTML = '';

            for (let i = 1; i <= 20; i++) {
                const backupData = data[`backupSaveData_${i}`];
                const backupComment = data[`backupSaveComment_${i}`];
                const listItem = document.createElement("div");
                if (backupData) {
                    listItem.innerHTML = `<div class="slotText">Slot ${i}</div><div class="slotComment">${backupComment || "No comment"}</div>
                    <div class="saveButtons"><div class="button" onclick="loadBackupSave(${i})">로드</div>
                    <div class="button" onclick="deleteBackupSave(${i})">삭제</div></div>`;
                } else {
                    listItem.innerHTML = `<div class="slotText">Slot ${i}</div><div class="slotEmpty">-</div>`;
                }
                backupList.appendChild(listItem);
            }
        });
    }

    // 백업 데이터를 로드하는 함수
    window.loadBackupSave = function(slot) {
        loadFromServer(data => {
            const backupData = data[`backupSaveData_${slot}`];
            if (backupData) {
                navigator.clipboard.writeText(backupData).then(() => {
                    showToast(`Backup save data from slot ${slot} copied to clipboard!`, "toast");
                }).catch(err => {
                    console.error('Failed to write to clipboard: ', err);
                });
            } else {
                showToast("No backup data found in this slot!", "toast");
            }
        });
    }

    // 백업 데이터를 삭제하는 함수
    window.deleteBackupSave = function(slot) {
        loadFromServer(data => {
            delete data[`backupSaveData_${slot}`];
            delete data[`backupSaveComment_${slot}`];

            saveToServer(data, () => {
                updateBackupList();
                showToast(`Backup save data from slot ${slot} deleted!`, "toast");
            });
        });
    }

    // 페이지 로드 시 최신 세이브 데이터 표시
    loadFromServer(data => {
        const latestComment = data.latestSaveComment;
        document.getElementById("latestSaveComment").innerText = latestComment || "No data";
        updateBackupList();
    });

    // 세이브 버튼 기능 연결
    document.getElementById("saveClipboardDataBtn").addEventListener("click", saveClipboardData);
    document.getElementById("loadLatestSaveBtn").addEventListener("click", loadLatestSave);
    document.getElementById("showBackupSlotsBtn").addEventListener("click", showBackupSlots);

    // 토스트 팝업 표시 함수
    function showToast(message, toastId, callback) {
        const toast = document.getElementById(toastId);
        toast.innerText = message;
        toast.classList.add("show");
        toast.classList.remove("hide");

        setTimeout(() => {
            toast.classList.add("hide");
            toast.classList.remove("show");

            setTimeout(() => {
                toast.style.visibility = 'hidden';
                toast.style.pointerEvents = 'none';
                if (callback) {
                    callback();
                }
            }, 300); // 애니메이션 지속 시간과 일치시킴
        }, 1500);

        // 애니메이션 시작 전에 visibility와 pointer-events를 설정
        toast.style.visibility = 'visible';
        toast.style.pointerEvents = 'auto';
    }
});

//버전 체커

document.addEventListener("DOMContentLoaded", () => {
    const versionCheckerDiv = document.getElementById('versionChecker');
    const updateStatusDiv = document.getElementById('updateStatus');

    // GitHub Pages에서 실행되는지 확인 (URL이 GitHub Pages의 도메인일 경우)
    const isGitHubPages = window.location.hostname.endsWith("github.io");

    // GitHub Pages와 로컬 환경에 따른 base URL 설정
    const baseURL = isGitHubPages 
        ? window.location.origin + window.location.pathname.split('/').slice(0, 2).join('/')
        : "";

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
