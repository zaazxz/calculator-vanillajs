// Calculate Function
const calculate = (n1, operator, n2) => {
  let result = "";
  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};

// Variable
const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".calculator-display p");
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
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }

    // Decimal
    if (action === "decimal") {
      display.textContent = displayedNum + ".";
    }

    // If action is defined
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }

    // Clear
    if (action === "clear") {
      console.log("clear key!");
    }

    // Calculate
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue);
    }
  }
  
});
