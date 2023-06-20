// DEFINE VARIABLES/CONSTANTS START

const defaultMode = "colorMode";
const defaultColor = 'rgb(0, 0, 0)';
const defaultPixels = 16;

let currentMode = defaultMode ;
let currentColor = defaultColor;
let currentPixels = defaultPixels;

const grid = document.querySelector("#grid");
const pixelSelect = document.querySelector("#pixelSelect");
const pixelValue = document.querySelector("#pixelValue");
const colorBtn = document.querySelector("#colorBtn");
const colorPicker = document.querySelector("#colorPicker");
const rainbowBtn = document.querySelector("#rainbowBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const resetBtn = document.querySelector("#resetBtn");

// SETTINGS CHANGE FUNCTIONS START

rainbowBtn.onclick = () => setCurrentMode("rainbowMode");
colorBtn.onclick = () => setCurrentMode("colorMode");
eraserBtn.onclick = () => setCurrentMode("eraserMode");

resetBtn.addEventListener("click", () => {
    grid.innerHTML = ''
    makeGrid(currentPixels);
});
colorPicker.addEventListener("change", (e) => {
    setCurrentMode("colorMode");
    currentColor = (e.target.value);
});
pixelSelect.addEventListener("change", (e) => {
    setCurrentPixels(e.target.value);
    grid.innerHTML = "";
    makeGrid(e.target.value);
});

pixelSelect.addEventListener("mousemove", (e) => {
    pixelValue.innerText = `${e.target.value} x ${e.target.value}`;
});

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    currentMode = newMode;
}

function setCurrentPixels(newPixels) {
    currentPixels = newPixels;
}

// SETUP FUNCTIONS START

function makeGrid(pixels) {
    grid.style.gridTemplateColumns = `repeat(${pixels}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${pixels}, 1fr)`;

    for (let i = 0; i < pixels * pixels; i++) {
        const gridBox = document.createElement('div');
        gridBox.classList.add("gridbox");
        gridBox.addEventListener("mouseover", changeColor);
        gridBox.addEventListener("touchmove", changeColor);
        gridBox.addEventListener("mousedown", changeColor);
        grid.appendChild(gridBox);
    }
}

function changeColor(e) {
    if (e.type === "mouseover" && !mousedown) return;
    if (currentMode === "rainbowMode") {
        let randR = Math.floor(Math.random() * 256);
        const randG = Math.floor(Math.random() * 256);
        const randB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randR}, ${randG}, ${randB})`;
    } else if (currentMode === 'colorMode') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraserMode') {
        e.target.style.backgroundColor = "rgb(255, 255, 255)";
    }
}

let mousedown = false;
document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false)

window.onload = () => {
    makeGrid(defaultPixels);
}
