// Variable
const calculator = document.querySelector(".calculator");
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

        // Remove class "is-depressed" from all keys
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

        // Checking if key have data action or not
        if (!action) {

            // Logic if displayed number is zero
            if (displayedNum === '0') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }

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
            
        }
    
        // Checking if data action decimal
        if (action === "decimal") {

            // If decimal key clicked
            display.textContent = displayedNum + '.'

        }

        // Checking if data action clear
        if (action === "clear") {
            console.log('Clear Key!')
        }

        // Checking if data action equal
        if (action === "calculate") {
            console.log('Equal Key!')
        }

    }
})