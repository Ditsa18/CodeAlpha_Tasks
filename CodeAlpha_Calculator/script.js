const result = document.getElementById("result");
const expression = document.getElementById("expression");
const buttons = document.querySelectorAll(".buttons button");
const soundToggle = document.getElementById("soundToggle");

let currentInput = "";
let soundOn = true;

const clickSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
);

// Button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    playSound();
    const value = button.innerText;

    if (value === "C") clearAll();
    else if (button.classList.contains("delete")) deleteLast();
    else if (value === "=") calculate();
    else appendValue(value);
  });
});

// Sound toggle
soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.querySelector("i").classList.toggle("fa-volume-high");
  soundToggle.querySelector("i").classList.toggle("fa-volume-xmark");
});

function playSound() {
  if (!soundOn) return;
  clickSound.currentTime = 0;
  clickSound.play();
}

// Core logic
function appendValue(value) {
  currentInput += value;
  updateDisplay();
}

function clearAll() {
  currentInput = "";
  expression.innerText = "0";
  result.value = "0";
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    const output = eval(
      currentInput.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")
    );
    result.value = output;
    expression.innerText = currentInput;
    currentInput = output.toString();
  } catch {
    result.value = "Error";
  }
}

function updateDisplay() {
  expression.innerText = currentInput || "0";
  result.value = currentInput || "0";
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  playSound();

  if (!isNaN(e.key)) appendValue(e.key);
  if (e.key === "+") appendValue("+");
  if (e.key === "-") appendValue("−");
  if (e.key === "*") appendValue("×");
  if (e.key === "/") appendValue("÷");
  if (e.key === ".") appendValue(".");
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") deleteLast();
  if (e.key === "Escape") clearAll();
});

clearAll();
