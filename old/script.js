/**Dropdown */


const dropdownBtn = document.querySelector('.dropbtn')// dropdown btn
const dropdownContent = document.querySelector('.dropdown-content')// dropdown btn

dropdownBtn.addEventListener('click', function(){
    console.log(dropdownContent.style.display)
    if(dropdownContent.style.display === 'block'){
        dropdownContent.style.display='none'
    }else{
        dropdownContent.style.display='block'
    }
})

/**responsive nav */
const btn = document.querySelector('nav .btn')
btn.addEventListener('click', function(){
    document.querySelector('nav ul').classList.toggle('show')
})


/**Testimonials */
if( document.querySelector('.reviews')){
    const reviewsSlide = document.querySelector('.reviews')
    const reviewsArray = document.querySelectorAll('.review')
    
    let counter = 0
    const size = reviewsArray[0].clientWidth
    // reviewsSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'
    
    function nextSlide(){
        console.log(counter)
        reviewsSlide.style.transition = "transform 0.4s ease-in-out"
        counter = counter + 1
        reviewsSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'   
    }
    reviewsSlide.addEventListener('transitionend', () => {
        if(reviewsArray[counter].id === 'first'){
            reviewsSlide.style.transition = 'none'
            counter = reviewsArray.length - 1 - counter
            reviewsSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'   
    
        }
    })
    var intervalId = window.setInterval(function(){
        nextSlide()
    }, 10000);

}

/**submitted form */
if(document.querySelector('form')){
    const form = document.querySelector('form')
    form.addEventListener('submit', function(e){
        console.log('sub')
        e.preventDefault()
        alert('Form submited')
    })
}

/** */
if(document.querySelector('.login')){
    const loginScreen = document.querySelector('.login')
    const registerScreen = document.querySelector('.register')
    const switchToRegister = document.querySelector('.login a')
    const switchToLogin = document.querySelector('.register a')
    
    switchToRegister.addEventListener('click', function(){
        loginScreen.style.display = 'none'
        registerScreen.style.display = 'block'
    })
    
    switchToLogin.addEventListener('click', function(){
        loginScreen.style.display = 'block'
        registerScreen.style.display = 'none'
    })
}

/**anagram */
if(document.querySelector('.anagram')){
    const startBtnAn = document.querySelector('.anagram #startGame')
    const numOfLetters = document.querySelector('.anagram #letters')
    const startScreenAn = document.querySelector('.anagram#game-start-screen')
    const playScreenAn = document.querySelector('.anagram#game-play-screen')
    const playAgain = document.querySelector('#play-again')
    const userInputs = document.querySelector('.anagram textarea')

    startBtnAn.addEventListener('click', function(){
        fetch('../anagram.json').then(res => res.json()).then(data => game(data))
    })

    const compareArrays = (a, b) =>{
        let same = true
        a.forEach(el => {
            if(!b.includes(el)){
                same =false
            }
        })
    
        return same
    }
    
    function game(data){
        let listOfArrays
        if(numOfLetters.value === 'Any'){
            const keys = Object.keys(data);
            const list = keys[Math.floor(Math.random() * keys.length)];
            listOfArrays = data[list]
        }else{
            listOfArrays = data[numOfLetters.value]
        }
        const randomArray = listOfArrays[Math.floor(Math.random() * listOfArrays.length)];
        const randomWord = randomArray[Math.floor(Math.random() * randomArray.length)];
        const answers = randomArray.filter(word => word !== randomWord)
        startScreenAn.style.display = 'none'
        playScreenAn.style.display = 'block'
    
        document.querySelector('#letter').innerHTML = `${randomWord}  (${randomArray.length - 1})`
        console.log(answers)
        let j = 30
        const counter = setInterval(() => {
            document.querySelector('#timer').innerHTML = j
            j--
            if(j === -1){
                clearInterval(counter)
                document.querySelector('.time').innerHTML = `<p class="text-red">Times up!</p>`
                document.querySelector('#end-game').style.display = 'block'
                document.querySelector('#num-l').innerHTML = randomArray.length - 1
                document.querySelector('#end-game #letter').innerHTML = randomWord
                answers.forEach(element => {
                    document.querySelector('#answers').innerHTML += `<li>${element}</li>`
                });
            }
        }, 1000)

        /** handle user inputs */
        userInputs.addEventListener('input', function(e){
        if(compareArrays(answers,userInputs.value.split(/\r?\n/))){
            clearInterval(counter)
            if(j > 0){
                document.querySelector('.time').innerHTML = `<p class="text-green">You did it! Congratulations!</p>`
                document.querySelector('#end-game').style.display = 'block'
                document.querySelector('#fail').style.display = 'none'
                document.querySelector('#success').innerHTML = `it took you ${30 - j} seconds`
            }
        }})
    }
    
    playAgain.addEventListener('click', function(){
        userInputs.value = ''
        location.reload()
    })
}

if(document.querySelector('.math')){
    const startBtn = document.querySelector('.math #startGame')
    const selectedOperation = document.querySelector('.math #operation')
    const startScreen = document.querySelector('.math#game-start-screen')
    const playScreen = document.querySelector('.math#game-play-screen')
    const endScreen = document.querySelector('.math#game-end-screen')
    const input = document.querySelector('.math input')
    const operation = document.querySelector('.math #operation-display')
    const numButtons = document.querySelectorAll('.math #num')
    const clearBtn = document.querySelector('#clear')
    const playAgainBtn = document.querySelector('#play-again')

    startBtn.addEventListener('click', function(){
        fetch('../math.json').then(res => res.json()).then(data => mathGame(data))
    })


    function mathGame(data){
        const listOfOperations = data[selectedOperation.value]
        console.log(listOfOperations)
        console.log(selectedOperation)
        startScreen.style.display = 'none'
        playScreen.style.display = 'block'
        document.querySelector('#operation-name').innerHTML = selectedOperation.value
        input.focus()
        let i = 0
        let j = 30
        let score = 0
        operation.innerHTML = listOfOperations[0].operation
        const counter = setInterval(() => {
            document.querySelector('#timer').innerHTML = j
            j--
            if(j === -1){
                clearInterval(counter)
                playScreen.style.display = 'none'
                endScreen.style.display = 'block'
                document.querySelector('#operation-n').innerHTML = selectedOperation.value
                document.querySelector('#final-score').innerHTML = score
            }
        }, 1000)

        input.addEventListener('input', function(){
            if(input.value*1 === listOfOperations[i].answer){
                score++
                document.querySelector('#score').innerHTML = score
                if(i === listOfOperations.length - 1) return
                i++
                operation.innerHTML = listOfOperations[i].operation
                input.value = ''
                input.focus()
            }
        })

        numButtons.forEach(btn => {
            btn.addEventListener('click', function(){
                console.log(btn.innerHTML)
                input.value += btn.innerHTML*1
                if(input.value*1 === listOfOperations[i].answer){
                    score++
                    document.querySelector('#score').innerHTML = score
                    if(i === listOfOperations.length - 1) return
                    i++
                    operation.innerHTML = listOfOperations[i].operation
                    input.value = ''
                    input.focus()
                }
            })
        })

        clearBtn.addEventListener('click', function(){
            input.value = ''
        })

        playAgainBtn.addEventListener('click', function(){
            input.value = ''
            location.reload()
        })
    }
}
