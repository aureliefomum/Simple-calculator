// create a Calculator class which will have a constructor wwhich will take all the inputs and functions of the calculator

class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        // set the variables for the calculator class
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear()
    }


//   create a clear function that clears out the variables in the input at the beginning of an operation,
// so it sets all the values in the display from the outset to empty strings by default. Call this function on constructor in line 8, so that the output is clear each time the user starts a new Calculator.
    clear() {
        this.currentOperand = ''
        this.previousOperand= ''
        this.operation = undefined
    }


    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }


//   create an appendNumber function that adds a number to the screen every time a user clicks on it. It takes the number the user selected as an argument.
    appendNumber(number) {
        //check whether the user has already typed the '.' and if the number in the input already includes '.' , return as is so the calculator does not add '.' more than once
        if (number === '.' && this.currentOperand.includes('.')) return
        
        //convert the input to a string to prevent Javascript from performing addition operation on the numbers the user clicks on and instead append them to each other
        //console.log(this.currentOperand)
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }


   //create a function that will take the operation the user selects and work with it, it takes the operation the user selected as an argument
    chooseOperation(operation){
        //tell the calculator to stop executing if the output is clear
        if(this.currentOperand === '') return
        //tell the calculator to compute the chosen operation if the previous and current operands are in the display
        if(this.previousOperand !== ''){
            this.compute()
        }

        //tell the calculator what operation was chosen, which is what was passed in by the event listener below
        this.operation = operation
        //tell the calculator that the user is done typing the current number so consider it as the previous number
        this.previousOperand = this.currentOperand

        //tell the calculator to clear out the new current operand, and allows the user to type in the next operand
        this.currentOperand = ''
    }



  //crate a function that takes the values inside the calculator and computes a single value for what needs to be displayed in the output 
    compute() {
        //create variable to store result of operation
        let computation
        //create a variable to store the number version of previous operand that had been converted to string
        const prev = parseFloat(this.previousOperand)
        // create another variable to store the current operand also converted from string to a number
        const current = parseFloat(this.currentOperand)
        //if the user does not type in anything, the calculator should not run
        if(isNaN(prev)||isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break

            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break  
                        
            case '÷':
                computation = prev / current
                 break
            default:
                 return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

getDisplayNumber(number){
    const stringNumber = number.toString()
    //display the first part of the number before the decimal point using integerDigits variable
     const integerDigits = parseFloat(stringNumber.split('.')[0])
    // display the second part of the number after the decimal point using the decimalDigits variable
    const decimalDigits = stringNumber.split('.')[1]

     let integerDisplay
     if (isNaN(integerDigits)){
         integerDisplay = ''
     } else{
         integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
           }
    if(decimalDigits != null ){
        return `${integerDisplay}.${decimalDigits}` 
        } else{
       return integerDisplay
         }
    
    
}




    //create a function the updates the display or alues in the output
    updateDisplay(){
        // defining variables for updateDisplay as this.currentOperand and this.previousoperand, which come from the appendNumber function above, which is the one that grabs the number from the input through the click event
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand) 
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else{
            this.previousOperandTextElement.innerText = ''
        }

        //tell the calculator to update the display taking the former currentOperand from the chooseOperation method and moving  it up into the preiousOperand space
        
        
    }
}



// Grab all our numbers, operators and operands and store in variables
const numberButtons= document.querySelectorAll('[data-number]')
const operationButtons= document.querySelectorAll('[data-operation]')
const equalsButton= document.querySelector('[data-equals]')
const deleteButton= document.querySelector('[data-delete]')
const allClearButton= document.querySelector('[data-all-clear]')
const previousOperandTextElement= document.querySelector('[data-previous-operand]')
const currentOperandTextElement= document.querySelector('[data-current-operand]')

// create a new calculator and pass all the variables fron the Calculator class into it

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// select all the number buttons, loop over them and add an event listener to them. The event listener says everytime the user clicks on a button/number, take that number and add it to the calculator and then update the display

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
 calculator.appendNumber(button.innerText)
 calculator.updateDisplay()
    })
})

//add an event listener to all the operation buttons,
// grab the operation the user selects, pass in its text to the chooseOperation() method and update the display
operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
 calculator.chooseOperation(button.innerText)
 calculator.updateDisplay()
    })
})

//add an event listener to the equals button

equalsButton.addEventListener('click', button => {
     calculator.compute()
     calculator.updateDisplay()
 })

 allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

