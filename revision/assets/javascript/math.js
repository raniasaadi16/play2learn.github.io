// Variables declaration
const startBtn = document.querySelector('.math #startGame') // start game button
const selectedOperation = document.querySelector('.math #operation') // selected operation
const startScreen = document.querySelector('.math#game-start-screen') // start game section
const playScreen = document.querySelector('.math#game-play-screen') // play game section
const endScreen = document.querySelector('.math#game-end-screen') // end game screen
const input = document.querySelector('.math input') // input
const operation = document.querySelector('.math #operation-display')
const numButtons = document.querySelectorAll('.math #num') // calculator  buttons
const clearBtn = document.querySelector('#clear') // clear button
const playAgainBtn = document.querySelector('#play-again') // play again button

// generate random operations function
function generateOperation(operat){
    let mathematicExpression = {num1: '', num2: '', answer: '' }
    mathematicExpression.num1 =  Math.floor((Math.random() * 100) + 1);  // generate randomly the first number of operation
    mathematicExpression.num2 =  Math.floor((Math.random() * 100) + mathematicExpression.num1);  // generate randomly the second number of operation
   
    // store the mathematic expression along with the answer according to selected operation
    if(operat === 'addition'){
        mathematicExpression.operation = ` ${mathematicExpression.num1} + ${mathematicExpression.num2}`
        mathematicExpression.answer = mathematicExpression.num1 + mathematicExpression.num2
    }
    if (operat === 'substraction'){
        mathematicExpression.operation = ` ${mathematicExpression.num2} - ${mathematicExpression.num1}`
        mathematicExpression.answer = mathematicExpression.num2 - mathematicExpression.num1
    }
    if (operat === 'multiplication'){
        mathematicExpression.operation = ` ${mathematicExpression.num1} * ${mathematicExpression.num2}`
        mathematicExpression.answer = mathematicExpression.num1 * mathematicExpression.num2
    }
    if (operat === 'division'){
        // for division, we must confirm that first and second numbers are divisible
        while (mathematicExpression.num1 % mathematicExpression.num2 !== 0) {
            mathematicExpression.num2 = Math.floor(Math.random()*10) + 1;
        }
    
        mathematicExpression.operation = ` ${mathematicExpression.num1} / ${mathematicExpression.num2}`
        mathematicExpression.answer = mathematicExpression.num1 / mathematicExpression.num2
    }
    // return the mathematic expression along with answer
    return mathematicExpression
}

// once the user clicked on start game button , mathGame function will be executed
startBtn.addEventListener('click', mathGame)

// mathGame function
function mathGame(){
    let expression = generateOperation(selectedOperation.value) // generate the first operation by calling generateOperation function and passing the operation type selected by user
    startScreen.style.display = 'none' // hide start game screen
    playScreen.style.display = 'block' // show play screen
    document.querySelector('#operation-name').innerHTML = selectedOperation.value //display the operation type selected by user
    input.focus() // focus the input
    let j = 30 // for counter (30 seconds)
    let score = 0 // store user score
    operation.innerHTML = expression.operation // display the operation

    // counter
    const counter = setInterval(() => {
        document.querySelector('#timer').innerHTML = j // display counter
        j--
        // if the 30seconds are done
        if(j === -1){
            clearInterval(counter)
            playScreen.style.display = 'none' // hide play game screen
            endScreen.style.display = 'block' // show end game screen
            document.querySelector('#operation-n').innerHTML = selectedOperation.value //display the operation type selected by user in the end screen
            document.querySelector('#final-score').innerHTML = score // display user score
        }
    }, 1000)

    // if the user use the keyboard to find the answer
    input.addEventListener('input', function(){
        // if he get the answer
        if(input.value*1 === expression.answer){
            score++ // add 1 to his score
            document.querySelector('#score').innerHTML = score // display the scoor
            expression = generateOperation(selectedOperation.value) // generate another operation by calling generateOperation function
            operation.innerHTML = expression.operation // display the new operation
            input.value = '' // clear input
            input.focus() // focus input
        }
    })

    // do the same thing if the user choose to answer with the calculator buttons
    numButtons.forEach(btn => {
        btn.addEventListener('click', function(){
            input.value += btn.innerHTML*1
            if(input.value*1 === expression.answer){
                score++
                document.querySelector('#score').innerHTML = score
                expression = generateOperation(selectedOperation.value)
                operation.innerHTML = expression.operation
                input.value = ''
                input.focus()
            }
        })
    })


}
// when click on clear button ,the will be cleared 
clearBtn.addEventListener('click', function(){
    input.value = ''
})

// when the user click on play again button , the input will be cleared and the page refreshed
playAgainBtn.addEventListener('click', function(){
    input.value = ''
    location.reload()
})
