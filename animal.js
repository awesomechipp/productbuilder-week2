const MODEL_URL = "https://teachablemachine.withgoogle.com/models/uY5EHYOCF/";

let model, webcam, labelContainer, maxPredictions;

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

async function init() {
    document.getElementById("start-section").style.display = "none";
    document.getElementById("camera-section").style.display = "block";

    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    webcam = new tmImage.Webcam(300, 300, true);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        const item = document.createElement("div");
        item.className = "bar-item";
        labelContainer.appendChild(item);
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);

    let topClass = prediction[0];
    for (let i = 1; i < maxPredictions; i++) {
        if (prediction[i].probability > topClass.probability) {
            topClass = prediction[i];
        }
    }

    for (let i = 0; i < maxPredictions; i++) {
        const p = prediction[i];
        const pct = Math.round(p.probability * 100);
        const info = animalInfo[p.className] || { emoji: "🐾", label: p.className, fillClass: "dog" };

        labelContainer.childNodes[i].innerHTML = `
            <div class="bar-header">
                <span class="bar-label">${info.emoji} ${info.label}</span>
                <span class="bar-pct">${pct}%</span>
            </div>
            <div class="bar-track">
                <div class="bar-fill ${info.fillClass}" style="width:${pct}%"></div>
            </div>
        `;
    }

    const topInfo = animalInfo[topClass.className] || { emoji: "🐾", label: topClass.className, desc: "" };
    const topPct = Math.round(topClass.probability * 100);

    if (topPct >= 55) {
        document.querySelector(".result-title").textContent = "✨ 분석 결과";
        document.getElementById("verdict").innerHTML = `
            ${topInfo.emoji} <strong>${topInfo.label}</strong>
            <div class="desc">${topInfo.desc}</div>
        `;
    } else {
        document.querySelector(".result-title").textContent = "🔍 분석 중...";
        document.getElementById("verdict").innerHTML = `😮 얼굴을 가까이 비춰주세요!`;
    }
}
