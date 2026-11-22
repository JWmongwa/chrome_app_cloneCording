// 배경 이미지 목록: image 폴더의 실제 파일명과 정확히 같아야 합니다.
// 사진을 추가하려면 이 배열에 파일명만 더하면 됩니다.
const IMAGE_LIST = [
    "image0.png",
    "image1.png",
    "image2.png",
];

// 배경이 바뀌는 간격 (3분)
const BG_INTERVAL = 1 * 60 * 1000;

const bgContainer = document.querySelector("#background-container");
let bgLayers = [];       // 겹쳐 둔 레이어 두 장
let bgVisibleIndex = 0;  // 지금 보이는 레이어 번호 (0 또는 1)
let bgPrevious = null;   // 직전에 보여 준 사진

// 직전 사진을 뺀 나머지 중에서 랜덤으로 하나를 고름
function pickNextImage() {
    if (IMAGE_LIST.length <= 1) return IMAGE_LIST[0];
    const candidates = IMAGE_LIST.filter((name) => name !== bgPrevious);
    return candidates[Math.floor(Math.random() * candidates.length)];
}

// 사진을 미리 내려받은 뒤 callback 실행 (로딩 중에 화면이 깜빡이는 것 방지)
function preload(name, callback) {
    const img = new Image();
    img.onload = callback;
    img.onerror = callback; // 실패해도 흐름은 이어 감
    img.src = `image/${name}`;
}

function changeBackground() {
    const next = pickNextImage();
    const nextIndex = bgVisibleIndex === 0 ? 1 : 0;

    preload(next, () => {
        // 안 보이던 레이어에 새 사진을 넣고 → 켜고 → 보이던 레이어는 끔
        bgLayers[nextIndex].style.backgroundImage = `url("image/${next}")`;
        bgLayers[nextIndex].classList.add("is-visible");
        bgLayers[bgVisibleIndex].classList.remove("is-visible");
        bgVisibleIndex = nextIndex;
        bgPrevious = next;
    });
}

function initBackground() {
    if (!bgContainer || IMAGE_LIST.length === 0) return;

    for (let i = 0; i < 2; i++) {
        const layer = document.createElement("div");
        layer.className = "background-layer";
        bgContainer.appendChild(layer);
        bgLayers.push(layer);
    }

    // 첫 사진은 바로 표시
    const first = pickNextImage();
    bgLayers[0].style.backgroundImage = `url("image/${first}")`;
    bgLayers[0].classList.add("is-visible");
    bgPrevious = first;

    setInterval(changeBackground, BG_INTERVAL);
}

initBackground();