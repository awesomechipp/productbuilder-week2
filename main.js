class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const number = this.getAttribute('number');
        const color = this.getColor(number);

        const ball = document.createElement('div');
        ball.style.backgroundColor = color;
        ball.style.width = '60px';
        ball.style.height = '60px';
        ball.style.borderRadius = '50%';
        ball.style.display = 'flex';
        ball.style.alignItems = 'center';
        ball.style.justifyContent = 'center';
        ball.style.fontSize = '1.5rem';
        ball.style.fontWeight = 'bold';
        ball.style.color = 'white';
        ball.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        ball.textContent = number;

        shadow.appendChild(ball);
    }

    getColor(number) {
        const value = parseInt(number, 10);
        if (value <= 10) return '#fbc400'; // Yellow
        if (value <= 20) return '#69c8f2'; // Blue
        if (value <= 30) return '#ff7272'; // Red
        if (value <= 40) return '#aaa'; // Gray
        return '#b0d840'; // Green
    }
}

customElements.define('lotto-ball', LottoBall);


document.getElementById('generate-btn').addEventListener('click', () => {
    const numbersDisplay = document.getElementById('numbers-display');
    numbersDisplay.innerHTML = '';
    const numbers = new Set();
    while(numbers.size < 6) {
        const randomNum = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNum);
    }

    for (const number of numbers) {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        numbersDisplay.appendChild(lottoBall);
    }
});
