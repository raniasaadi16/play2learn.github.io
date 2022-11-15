// List of anagrams
const anagram =  {
    "5" : [
        [
            "abets",
            "baste",
            "betas",
            "beast",
            "beats"
        ],
        [
            "acres",
            "cares",
            "races",
            "scare"
        ],
        [
            "alert",
            "alter",
            "later"
        ],
        [
            "angel",
            "angle",
            "glean"
        ],
        [
            "baker",
            "brake",
            "break"
        ],
        [
            "bared",
            "beard",
            "bread",
            "debar"
        ],
        [
            "dater",
            "rated",
            "trade",
            "tread"
        ],
        [
            "below",
            "bowel",
            "elbow"
        ],
        [
            "caret",
            "cater",
            "crate",
            "trace",
            "react"
        ]
    ],
    "6" : [
        [
            "arrest",
            "rarest",
            "raster",
            "raters",
            "starer"
        ],
        [
            "carets",
            "caters",
            "caster",
            "crates",
            "reacts",
            "recast",
            "traces"
        ],
        [
            "canter",
            "nectar",
            "recant",
            "trance"
        ],
        [
            "danger",
            "gander",
            "garden",
            "ranged"
        ],
        [
            "daters",
            "trades",
            "treads",
            "stared"
        ]
    ],
    "7" : [
        [
            "allergy",
            "gallery",
            "largely",
            "regally"
        ],
        [
            "aspired",
            "despair",
            "diapers",
            "praised"
        ],
        [
            "claimed",
            "decimal",
            "declaim",
            "medical"
        ],
        [
            "dearths",
            "hardest",
            "hatreds",
            "threads",
            "trashed"
        ],
        [
            "detains",
            "instead",
            "sainted",
            "stained"
        ]
    ],
    "8" : [
        [
            "parroted",
            "predator",
            "prorated",
            "teardrop"
        ],
        [
            "repaints",
            "painters",
            "pantries",
            "pertains"
        ],
        [
            "restrain",
            "retrains",
            "strainer",
            "terrains",
            "trainers"
        ],
        [
            "construe",
            "counters",
            "recounts",
            "trounces"
        ]
    ]
}
// Variables declaration
const startBtnAn = document.querySelector('.anagram #startGame') // start game button
const numOfLetters = document.querySelector('.anagram #letters') // number of letters selected
const startScreenAn = document.querySelector('.anagram#game-start-screen') // start screen section
const playScreenAn = document.querySelector('.anagram#game-play-screen') // play game section
const playAgain = document.querySelector('#play-again') // play again button
const userInputs = document.querySelector('.anagram textarea') // taped text by user

// when the user click on start game the 'game' function will be executed
startBtnAn.addEventListener('click', game)

// function to compare between right answers and user text
const compareArrays = (a, b) =>{
    let same = true
    a.forEach(el => {
        if(!b.includes(el)){
            same =false
        }
    })

    return same
}

// game function
function game(){
    let listOfArrays
    // select anagrams according to selected option (ie: Any, 5, 6,7,8)
    if(numOfLetters.value === 'Any'){
        const keys = Object.keys(anagram);
        const list = keys[Math.floor(Math.random() * keys.length)];
        listOfArrays = anagram[list]
    }else{
        listOfArrays = anagram[numOfLetters.value]
    }
    const randomArray = listOfArrays[Math.floor(Math.random() * listOfArrays.length)];
    const randomWord = randomArray[Math.floor(Math.random() * randomArray.length)]; // choose the word displayed on the screen rando,ly
    const answers = randomArray.filter(word => word !== randomWord); // store array of answers in variable
    console.log(answers)
    startScreenAn.style.display = 'none'  // hide start screen
    playScreenAn.style.display = 'block' // show play screen

    document.querySelector('#letter').innerHTML = `${randomWord}  (${randomArray.length - 1})` // display the word along with the number of agrams it has
    let j = 30 // for counter (30 seconds)

    // start counting
    const counter = setInterval(() => {
        document.querySelector('#timer').innerHTML = j // display counter
        j--
        // if the 30seconds are done
        if(j === -1){
            clearInterval(counter)
            document.querySelector('.time').innerHTML = `<p class="text-red">Times up!</p>` // show 'Times up'
            document.querySelector('#end-game').style.display = 'block' // show end game screen
            document.querySelector('#num-l').innerHTML = randomArray.length - 1 // display num of anagrams 
            document.querySelector('#end-game #letter').innerHTML = randomWord  // display the word
            // display the answers
            answers.forEach(element => {
                document.querySelector('#answers').innerHTML += `<li>${element}</li>`
            });
        }
    }, 1000)

    /** handle user inputs */
    userInputs.addEventListener('input', function(e){
        // check if user has find the answers with help of 'compareArrays function)
    if(compareArrays(answers,userInputs.value.split(/\r?\n/))){
        // clear the counter
        clearInterval(counter)
        if(j > 0){
            document.querySelector('.time').innerHTML = `<p class="text-primary">You did it! Congratulations!</p>` // display 'You did it! Congratulations!'
            document.querySelector('#end-game').style.display = 'block' // show end game screen
            document.querySelector('#fail').style.display = 'none' 
            document.querySelector('#success').innerHTML = `it took you ${30 - j} seconds` // hide play screen
        }
    }})
}

// when the user click on play again button , the input will be cleared and the page refreshed
playAgain.addEventListener('click', function(){
    userInputs.value = ''
    location.reload()
})
