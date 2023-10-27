const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

let timerId = null;
let isActive = false;


function onStartClick() {
 if (!isActive) { 
        timerId = setInterval(bodyChangeColor, 1000);
        startBtn.setAttribute('disabled', 'true');
        stopBtn.removeAttribute("disabled");
        isActive = true;
    }
}

function onStopClick() {
    if (isActive) { 
        clearInterval(timerId);
        startBtn.removeAttribute("disabled");
        stopBtn.setAttribute("disabled", "true");
        isActive = false;
    }
}

function bodyChangeColor() {
    const color = getRandomHexColor();
    bodyEl.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
