const guessed = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainText = document.querySelector(".remaining");
const remainNum = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const rePlay = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function(){
    const getData = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await getData.text();
    // console.log(data);
    const wordArray = data.split("\n");
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random()* wordArray.length);
    const randomWord = wordArray[randomIndex];
    word = randomWord.trim();
    console.log(word);
    updatePlaceholder(word);
}

getWord();

const updatePlaceholder = function(word){

    // looping through each letter to replace it by symbol,
    // in future if letter entered match do not replace 
    //with symbol
 
    const placeholderArray = [];
    for (const letter of word) {
    //   console.log(letter);
      placeholderArray.push("●");
    }

    // other solution:
    // const wordArray = word.split("");
    // wordArray.forEach( function(letter, index){
    //     wordArray.splice(index, 1, "●" );
    //     console.log(letter);
    // });

    inProgress.innerText = placeholderArray.join("");

}

// updatePlaceholder(word);

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
        showGuessedLetters(guess);
        countGuesses(guess);

    }
    updateWordInProgress(guessedLetters); 
};

const showGuessedLetters = function(){
    guessed.innerHTML = "";
    for (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessed.append(li);
    }
};

const updateWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    console.log(wordArray);
    const newArray = [];
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            newArray.push(letter.toUpperCase());
        } else {
            newArray.push("●");
        }
    }
    inProgress.innerText = newArray.join("");

    hasWin();

};

const countGuesses = function(guess){
    const wordUpper = word.toUpperCase();

    if (!wordUpper.includes(guess)){
        remainingGuesses -= 1;
        message.innerText =`Sorry, the word does not contain the letter ${guess}, try again!`;
    } else {
        message.innerText =`Good guess! The word does contain the letter ${guess}`;
    }

    if (remainingGuesses === 0 ){
        remainText.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1){
        remainNum.innerText = `${remainingGuesses} guess`
    } else {
        remainNum.innerText = `${remainingGuesses} guesses`
    }
    
}

const hasWin = function(){
    if (word.toUpperCase() === inProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;

    }
}








