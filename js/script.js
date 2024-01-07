// Variable
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector(".calculator-key");
const display = calculator.querySelector(".calculator-display p");

// Keys
keys.addEventListener("click", e => {
    if (e.target.matches('button')) {

        // Variable
        const key = e.target 
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType
        
        // Remove class "is-depressed" from all keys
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

        // Checking if key have data action or not
        if (!action) {

            // Logic if displayed number is zero
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }

            // Set Key Type
            calculator.dataset.previousKeyType = 'number'

        }

        // Checking if data action is an operator key
        if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide"
        ) {

            // Add class "is-depressed" to operator key
            key.classList.add('is-depressed')

            // Add custom attribute
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
            
        }
    
        // Checking if data action decimal
        if (action === "decimal") {

            // Checking Displayed Number
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            } else if (previousKeyType === 'operator') {
                display.textContent = '0.'
            }

            // Set Key Type
            calculator.dataset.previousKeyType = 'decimal'

        }

        // Checking if data action clear
        if (action === "clear") {

            // Set Key Type
            calculator.dataset.previousKeyType = 'clear'

        }

        // Checking if data action equal
        if (action === "calculate") {
            
            // Params
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
  
            // Set Key Type
            calculator.dataset.previousKeyType = 'calculate'

            // Calculating
            display.textContent = calculate(firstValue, operator, secondValue)

        }

    }
})

const calculate = (n1, operator, n2) => {
    
    // Result Variable
    let result = ''
  
    // Logic
    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2)
    }
    
    // Return Value
    return result

}