const guessed = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainText = document.querySelector(".remaining");
const remainNum = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const rePlay = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const updateWord = function(word){

    // looping through each letter to replace it by symbol,
    // in future if letter entered match do not replace 
    //with symbol
 
    const wordArray = [];
    for (const letter of word) {
    //   console.log(letter);
      wordArray.push("●");
    }

    // other solution:
    // const wordArray = word.split("");
    // wordArray.forEach( function(letter, index){
    //     wordArray.splice(index, 1, "●" );
    //     console.log(letter);
    // });

    inProgress.innerText = wordArray.join("");

}

updateWord(word);

button.addEventListener("click", function(e){
    e.preventDefault();
    const guess = letterInput.value;
    // console.log(guess);

    message.innerText ="";
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }

    letterInput.value = "";
});

const validateInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length  === 0){
        message.innerText = "Please enter a letter.";
    } else if (input.length >1 ){
        message.innerText = "Please enter a single letter.";
    } else if ( !input.match(acceptedLetter)){
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }; 
};

const makeGuess = function(guess){
    guess = guess.toUpperCase();
    console.log(guess);
    if (guessedLetters.includes(guess)){
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

