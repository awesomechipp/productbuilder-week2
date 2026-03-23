const generateBtn = document.getElementById('generate-btn');
const numbersDisplay = document.getElementById('numbers-display');
const historyList = document.getElementById('history-list');
const themeBtn = document.getElementById('theme-btn');

// --- Theme Logic ---
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    themeBtn.textContent = theme === 'light' ? '🌙' : '☀️';
}

themeBtn.addEventListener('click', toggleTheme);
initTheme();


// --- Lotto Logic ---
function getBallColorClass(num) {
    if (num <= 10) return 'y1';
    if (num <= 20) return 'y2';
    if (num <= 30) return 'y3';
    if (num <= 40) return 'y4';
    return 'y5';
}

function createBall(num, delay) {
    const ball = document.createElement('div');
    ball.classList.add('ball', getBallColorClass(num));
    ball.textContent = num;
    ball.style.animationDelay = `${delay}s`;
    return ball;
}

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function addHistory(numbers) {
    const li = document.createElement('li');
    li.classList.add('history-item');
    const now = new Date().toLocaleTimeString();
    li.innerHTML = `<span>${numbers.join(', ')}</span> <span>${now}</span>`;
    historyList.prepend(li);
    
    if (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}

generateBtn.addEventListener('click', () => {
    generateBtn.disabled = true;
    numbersDisplay.innerHTML = '';
    
    const numbers = generateLottoNumbers();
    
    numbers.forEach((num, index) => {
        const ball = createBall(num, index * 0.1);
        numbersDisplay.appendChild(ball);
    });

    setTimeout(() => {
        generateBtn.disabled = false;
        addHistory(numbers);
    }, 600);
});
