document.addEventListener("DOMContentLoaded", () => {
    // 모달 열기/닫기 기능
    const saveModal = document.getElementById("saveModal");
    const retextureModal = document.getElementById("retextureModal");
    const saveModalClose = document.getElementsByClassName("close")[0];
    const retextureModalClose = document.getElementsByClassName("close-retexture")[0];

    const manageSavesBtn = document.getElementById("manageSavesBtn");
    const retextureBtn = document.getElementById("retextureBtn");

    const startGameLink = document.getElementById("startGameLink");

    const githubToken = process.env.GIST_TOKEN;;
    const gistId = process.env.GIST_ID;

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
            saveToGist({ latestSaveData: text, latestSaveComment: comment }, () => {
                document.getElementById("latestSaveComment").innerText = comment || "No comment";
                showToast("Save data saved successfully!", "toast");
            });
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    }

    // Gist로 데이터를 저장하는 함수
    function saveToGist(data, callback) {
        loadFromGist(existingData => {
            const updatedData = { ...existingData, ...data };
            fetch(`https://api.github.com/gists/${gistId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `token ${githubToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    files: {
                        'saveData.json': {
                            content: JSON.stringify(updatedData)
                        }
                    }
                })
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to save data to Gist');
            })
            .then(callback)
            .catch(err => console.error(err.message));
        });
    }

    // Gist에서 데이터를 가져오는 함수
    function loadFromGist(callback) {
        fetch(`https://api.github.com/gists/${gistId}`, {
            headers: {
                'Authorization': `token ${githubToken}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load data from Gist');
        })
        .then(data => {
            const content = data.files['saveData.json'].content;
            callback(JSON.parse(content));
        })
        .catch(err => console.error(err.message));
    }

    // Latest Save를 불러오는 함수
    function loadLatestSave() {
        loadFromGist(data => {
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
        loadFromGist(data => {
            const latestSaveData = data.latestSaveData;
            const latestSaveComment = data.latestSaveComment;
            if (!latestSaveData) {
                showToast("No latest save data to backup!", "toast");
                return;
            }

            data[`backupSaveData_${slot}`] = latestSaveData;
            data[`backupSaveComment_${slot}`] = latestSaveComment;

            saveToGist(data, () => {
                updateBackupList();
                showToast(`Latest save data backed up to slot ${slot}!`, "toast");
            });
        });
    }

    // 백업 리스트를 업데이트하는 함수
    function updateBackupList() {
        loadFromGist(data => {
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
        loadFromGist(data => {
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
        loadFromGist(data => {
            delete data[`backupSaveData_${slot}`];
            delete data[`backupSaveComment_${slot}`];

            fetch(`https://api.github.com/gists/${gistId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `token ${githubToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    files: {
                        'saveData.json': {
                            content: JSON.stringify(data)
                        }
                    }
                })
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to delete data from Gist');
            })
            .then(() => {
                updateBackupList();
                showToast(`Backup save data from slot ${slot} deleted!`, "toast");
            })
            .catch(err => console.error(err.message));
        });
    }

    // 페이지 로드 시 최신 세이브 데이터 표시
    loadFromGist(data => {
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
