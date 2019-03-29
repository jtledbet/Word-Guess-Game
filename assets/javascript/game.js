
// Initialize word list:
var wordList = ["debris", "astronaut", "asteroid", "atmosphere", "cosmos", "earth", "explorer", "galaxy", "gas", "horizon", "launch", "meteor", "moon", "ocean", "orbit", "outerspace", "planet", "radiation", "rocket", "satellite", "simulator", "space", "spacecraft", "spaceshuttle", "spacestation", "surface", "universe", "weightlessness", "commercial", "cosmic", "extreme", "gravitation", "gravitational", "horizontal", "inevitable", "lunar", "meteoric", "outer", "solar", "terrestrial", "toxic", "uninhabitable", "universal", "unmanned", "acclimatize", "colonize", "explore", "float", "orbit"]

// Stats declaration:
var wins = 0
var losses = 0
var guessed = ""
var totalGuesses = 10
var correctGuesses = 0
var maxWordLength = 8
var guessesRem = totalGuesses
guessesNow.innerHTML = ("Guesses remaining: " + guessesRem)

// Boxes hidden by default:
for(i = 0; i < 15; i++){
    var curSpot = "spot" + i
    var getSpot = document.getElementById(curSpot)
    getSpot.innerHTML = " "
    getSpot.hidden = true
}

// Choose a word (max length argument)
var theWord = selectWord(maxWordLength)
console.log("theWord: " + theWord);

// When a key is pressed:
document.onkeyup = function (event) {

    // Determines which key was pressed:
    var userGuess = event.key;
    // Converts to lcase:
    userGuess = userGuess.toLowerCase();

    console.log("theWord: " + theWord);
    console.log("userGuess: " + userGuess);

    console.log("index: " + theWord.indexOf(userGuess));

    // Making sure user input is a letter of the alphabet and hasn't already been guessed:
    var alphabet = "abcdefghijklmnopqrstuvwxyz"
    if (alphabet.indexOf(userGuess) != (-1)) {
        console.log("submitting guess!")
        if (guessed.indexOf(userGuess) === (-1)) {
            submitGuess(userGuess);
            } else {
                prompts.innerHTML = ("Wait! <br>You already guessed \'" + userGuess + "\'. <br>Guess a different letter.")
            }
    }

}

function submitGuess(userGuess) {

    // Add current guess to guessed list:
    guessed = guessed + userGuess
    var howMany = 0

    console.log("index in 'guessed': " + guessed.indexOf(userGuess))
    // If the guessed letter is in the word:
    if (theWord.indexOf(userGuess) != (-1)) {

        for (i = 0; i < theWord.length; i++) {
            if (theWord[i] === userGuess){
                howMany++
                ltrIndex = i
                var curSpot = "spot" + ltrIndex
                getSpot = document.getElementById(curSpot)
                getSpot.innerHTML = theWord[ltrIndex]
                getSpot.style.color = "#04FA1D"
            }
        }

        if (howMany > 1){
            prompts.innerHTML = ("Good guess!" + "<br>The word contains " + howMany + " \'" + userGuess + "\'s.")
        } else if (howMany === 1) {
            prompts.innerHTML = ("Good guess!" + "<br>The word contains one \'" + userGuess + "\'.")
        }
        
        // Win condition:
        correctGuesses += howMany
        checkWin(correctGuesses, theWord.length)

    } else {
        
        prompts.innerHTML = ("Negative!" + "<br> No \'" + userGuess + "\' in the word. <br>Please try again.");
        guessesRem--

    }

    if (guessesRem <= 0) {
        prompts.innerHTML = "All out of guesses!<br> Game over."
        losses++
        lossesNow.innerHTML = ("Losses: " + losses)

        setTimeout(function(){ 
            resetGame();
        }, 3000);
    }

    function win() {
        wins++
        winsNow.innerHTML = ("Wins: " + wins)
    }

    // Rally the stats:
    guessesNow.innerHTML = ("Guesses remaining: " + guessesRem)
    guessedSoFar.innerHTML = ("Guessed so far: " + guessed)
}

function selectWord(maxlength) {
    var theWord = ""
    // Computer picks a word (restricted max-length)
    while (theWord === "" || theWord.length > maxlength)
        theWord = wordList[Math.floor(Math.random() * wordList.length)];
    
    // Fill in underscores:
    for (i = 0; i < 15; i++) {
        var curSpot = "spot" + i
        var getSpot = document.getElementById(curSpot)
        
        if (theWord[i] != null) {
            // getSpot.innerHTML = i + 1
            getSpot.innerHTML = " "
            getSpot.hidden = false
            getSpot.style.color = "white"
        } else {
            getSpot.innerHTML = " "
            getSpot.hidden = true
            getSpot.style.color = "white"
        }
    }

    // Resize columns based on word length:
    for (i = 0; i < theWord.length; i++) {
        var curSpot = "spot" + i
        
        if (theWord.length <= 8){
            resizeSpots = document.getElementById(curSpot)
            resizeSpots.setAttribute("class", "col-" + 1)
            console.log("resizing 8")
        } if (theWord.length <= 7){
            resizeSpots = document.getElementById(curSpot)
            resizeSpots.setAttribute("class", "col-" + 1)
            console.log("resizing 7")
        } if (theWord.length <= 6){
            resizeSpots = document.getElementById(curSpot)
            resizeSpots.setAttribute("class", "col-" + 2)
            console.log("resizing 6")
        } if (theWord.length <= 5){
            resizeSpots = document.getElementById(curSpot)
            resizeSpots.setAttribute("class", "col-" + 2)
            console.log("resizing 5")
        }     

    }
    
        return theWord
}

function checkWin(a, b) {
    if (a === b) {
        instructions.innerHTML = "You've won!<br>Congratulations."
        correctGuesses = 0
        howMany = 0
        wins++    
        
        setTimeout(function(){ 
            resetGame();
        }, 3000);
    }
}

function resetGame() {
    theWord = selectWord(maxWordLength)
    
    guessesRem = 10
    guessed = ""

    instructions.innerHTML = "Guess what word I'm thinking of. <br> (Press a key to guess a letter.)"
    prompts.innerHTML = "New game!<br>Good luck."

    updateStats()
}

function updateStats() {
    winsNow.innerHTML = ("Wins: " + wins)
    lossesNow.innerHTML = ("Losses: " + losses)
    guessesNow.innerHTML = ("Guesses remaining: " + guessesRem)
    guessedSoFar.innerHTML = ("Guessed so far: " + guessed)
}