const MODEL_URL = "https://teachablemachine.withgoogle.com/models/uY5EHYOCF/";

let model;

const animalInfo = {
    "강아지": {
        emoji: "🐶",
        label: "강아지상",
        desc: "밝고 친근한 분위기! 누구에게나 사랑받는 타입이에요.",
        fillClass: "dog"
    },
    "고양이": {
        emoji: "🐱",
        label: "고양이상",
        desc: "도도하고 매력적인 분위기! 신비로운 매력을 가진 타입이에요.",
        fillClass: "cat"
    }
};

// 모델 미리 로드
async function loadModel() {
    model = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
}
loadModel();

// 파일 선택 이벤트
document.getElementById("file-input").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;
    showPreview(file);
});

// 드래그 앤 드롭
const uploadBox = document.getElementById("upload-box");
uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.add("drag-over");
});
uploadBox.addEventListener("dragleave", () => uploadBox.classList.remove("drag-over"));
uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) showPreview(file);
});

// 다시 선택
document.getElementById("reupload-btn").addEventListener("click", () => {
    document.getElementById("preview-box").style.display = "none";
    document.getElementById("upload-box").style.display = "flex";
    document.getElementById("analyze-btn").style.display = "none";
    document.getElementById("result-box").style.display = "none";
    document.getElementById("file-input").value = "";
});

function showPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById("preview-img").src = e.target.result;
        document.getElementById("upload-box").style.display = "none";
        document.getElementById("preview-box").style.display = "block";
        document.getElementById("analyze-btn").style.display = "block";
        document.getElementById("result-box").style.display = "none";
    };
    reader.readAsDataURL(file);
}

async function analyze() {
    if (!model) {
        alert("모델을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
        return;
    }

    const img = document.getElementById("preview-img");
    const btn = document.getElementById("analyze-btn");
    btn.textContent = "분석 중... ⏳";
    btn.disabled = true;

    const prediction = await model.predict(img);

    let topClass = prediction[0];
    for (let i = 1; i < prediction.length; i++) {
        if (prediction[i].probability > topClass.probability) {
            topClass = prediction[i];
        }
    }

    const labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = "";
    for (const p of prediction) {
        const pct = Math.round(p.probability * 100);
        const info = animalInfo[p.className] || { emoji: "🐾", label: p.className, fillClass: "dog" };
        const item = document.createElement("div");
        item.className = "bar-item";
        item.innerHTML = `
            <div class="bar-header">
                <span class="bar-label">${info.emoji} ${info.label}</span>
                <span class="bar-pct">${pct}%</span>
            </div>
            <div class="bar-track">
                <div class="bar-fill ${info.fillClass}" style="width:${pct}%"></div>
            </div>
        `;
        labelContainer.appendChild(item);
    }

    const topInfo = animalInfo[topClass.className] || { emoji: "🐾", label: topClass.className, desc: "" };
    document.getElementById("verdict").innerHTML = `
        ${topInfo.emoji} <strong>${topInfo.label}</strong>
        <div class="desc">${topInfo.desc}</div>
    `;

    document.getElementById("result-box").style.display = "block";
    btn.textContent = "다시 분석하기 🔍";
    btn.disabled = false;
}
