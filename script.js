let firstNumber = "";
let operator = "";
let secondNumber = "";
let currentInput = "0";

function updateDisplay() {
  document.getElementById("display").innerText = currentInput;
}

function appendNumber(number) {
  if (currentInput === "0" || currentInput === "-0") {
    currentInput = number.toString();
  } else {
    currentInput += number.toString();
  }
  updateDisplay();
}

function setOperator(op) {
  if (operator !== "" && secondNumber !== "") {
    calculate();
  }
  operator = op;
  firstNumber = currentInput;
  currentInput = "0";
  updateDisplay();
}

function calculate() {
  if (operator === "" || firstNumber === "" || currentInput === "") {
    return;
  }

  secondNumber = currentInput;
  let result;

  switch (operator) {
    case "+":
      result = add(parseFloat(firstNumber), parseFloat(secondNumber));
      break;
    case "-":
      result = subtract(parseFloat(firstNumber), parseFloat(secondNumber));
      break;
    case "*":
      result = multiply(parseFloat(firstNumber), parseFloat(secondNumber));
      break;
    case "/":
      if (secondNumber === "0") {
        alert("Error: Cannot divide by zero!");
        clearDisplay();
        return;
      }
      result = divide(parseFloat(firstNumber), parseFloat(secondNumber));
      break;
    default:
      return;
  }

  currentInput = result.toString();
  firstNumber = "";
  operator = "";
  secondNumber = "";
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  firstNumber = "";
  operator = "";
  secondNumber = "";
  updateDisplay();
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function appendDecimal() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay();
  }
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  if (currentInput === "" || currentInput === "-") {
    currentInput = "0";
  }
  updateDisplay();
}
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  const key = event.key;

  if (/[0-9]/.test(key)) {
    appendNumber(parseInt(key));
  } else if (["+", "-", "*", "/"].includes(key)) {
    setOperator(key);
  } else if (key === ".") {
    appendDecimal();
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    backspace();
  }
}
