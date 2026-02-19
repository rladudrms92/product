class LottoBall extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    const number = this.getAttribute('number');
    const color = this.getColor(number);

    const style = document.createElement('style');
    style.textContent = `
      div {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        color: white;
        background-color: ${color};
        box-shadow: 0 4px 8px rgba(0,0,0,0.2), inset 0 -3px 3px rgba(0,0,0,0.3);
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      }
    `;

    wrapper.textContent = number;
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }

  getColor(number) {
    const num = parseInt(number);
    if (num <= 10) return '#fbc400'; // Yellow
    if (num <= 20) return '#69c8f2'; // Blue
    if (num <= 30) return '#ff7272'; // Red
    if (num <= 40) return '#aaa';    // Gray
    return '#b0d840';      // Green
  }
}

customElements.define('lotto-ball', LottoBall);

const lottoNumbersContainer = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');

function generateNumbers() {
  lottoNumbersContainer.innerHTML = '';
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  for (const number of [...numbers].sort((a, b) => a - b)) {
    const lottoBall = document.createElement('lotto-ball');
    lottoBall.setAttribute('number', number);
    lottoNumbersContainer.appendChild(lottoBall);
  }
}

generateBtn.addEventListener('click', generateNumbers);

// Generate numbers on initial load
generateNumbers();
