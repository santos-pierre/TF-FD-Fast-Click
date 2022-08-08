const time = 30;
let timeLeft = time;
let score = 0;
let previousPosition;
const app = document.querySelector('#app');
const timerElement = document.querySelector('#ath span:last-child span');
const scoreElement = document.querySelector('#ath span:first-child span');
scoreElement.innerHTML = score;

/**
 * @param {Element | HTMLElement} parentElement
 */
function initGame(parentElement) {
	const square = document.createElement('div');
	square.id = 'square';
	randomPosition(square);
	square.addEventListener('click', handleClick)
	timerElement.innerHTML = `${timeLeft >= 10 ? timeLeft : `0${timeLeft}`}s`;
	parentElement.appendChild(square);
}

/**
 * @param {Element | HTMLElement} element
 */
function randomPosition(element) {
	element.style.top = `${Math.random() * (90 - 10) + 10}%`;
	element.style.left = `${Math.random() * (90 - 10) + 10}%`;
}

/**
 * @param {MouseEvent} event
 */
function handleClick(event) {
	if (previousPosition) {
		const {x, y} = previousPosition;
		const {x2, y2} = { x2: event.target.offsetLeft, y2: event.target.offsetTop }
		score += Math.floor(Math.sqrt(Math.pow((x2 - x), 2)+(y2 - y)));
	}
	previousPosition = { x: event.target.offsetLeft, y: event.target.offsetTop };
	scoreElement.innerHTML = score;
	randomPosition(event.target);
}

(() => {
	const countdown = document.createElement('div');
	countdown.id = 'countdown';
	const textCountdown = document.createElement('span');
	textCountdown.innerHTML = 3;
	countdown.appendChild(textCountdown);
	app.appendChild(countdown);

	const coutdownTimer = setInterval(() => {
		textCountdown.innerHTML = +textCountdown.innerHTML - 1;
		if (+textCountdown.innerHTML === 0) {
			clearInterval(coutdownTimer);
			countdown.remove();
			initGame(app);
			const timer = setInterval(() => {
				if (timeLeft === 0) {
					document.querySelector("#square").removeEventListener('click', handleClick);
					clearInterval(timer);
				}else {
					timeLeft--;
					timerElement.innerHTML = `${timeLeft >= 10 ? timeLeft : `0${timeLeft}`}s`;
				}
			}, 1000);
		}
	}, 1000);
})()
