// Calculate Function
const calculate = (n1, operator, n2) => {
  // Numbers
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);

  // Logic
  if (operator === "add") return firstNum + secondNum;
  if (operator === "subtract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
};

// Variable
const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".calculator-display span");
const keys = calculator.querySelector(".calculator-key");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    // Variable
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    // Resetting is-depressed
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    // If action is not defined
    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }

      calculator.dataset.previousKeyType = "number";
    }

    // Decimal
    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }

      calculator.dataset.previousKeyType = "decimal";
    }

    // If action is defined
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      // Note : It's sufficient to check that firstValue, because second value always exists
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        // Update calculated as firstValue
        calculator.dataset.firstValue = calcValue;
      } else {
        // If there no calculations, set Displayed number as firstValue
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    // Clear
    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      display.textContent = 0;

      calculator.dataset.previousKeyType = "clear";
    }

    if (action !== "clear") {
      const clearButton = calculator.querySelector(".key-clear");
      clearButton.textContent = "CE";
    }

    // Calculate
    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }

        display.textContent = calculate(firstValue, operator, secondValue);
      }

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});
