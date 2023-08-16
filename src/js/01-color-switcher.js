const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let isActive = false;
let intervalId = null;

startBtn.addEventListener('click', onChangeBgColor);
stopBtn.addEventListener('click', stopInterval);

function onChangeBgColor() {
  if (isActive) return;
  isActive = true;
  document.body.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopInterval() {
  if (!isActive) return;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
