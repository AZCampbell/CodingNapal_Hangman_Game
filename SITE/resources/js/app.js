const keyboardDiv = document.querySelector(".keyboard"); // Select the keyboard div from the DOM
const hangmanImage = document.querySelector(".hangman-box img"); // Select the hangman image from the DOM
const wordDisplay = document.querySelector(".word-display"); // Select the word display from the DOM
const guessesText = document.querySelector(".guesses-text b"); // Select the guesses text from the DOM
const gameModal = document.querySelector(".game-modal"); // Select the game modal from the DOM
const playAgainBtn = document.querySelector(".play-again"); // Select the play again button from the DOM
// Sets up word list
let currentWord, // Stores the current word
  correctLetters = []; // Stores an array of correctly guessed letters
let wrongGuessCount = 0; // Keeps track of the number of wrong guesses
const maxGuesses = 6; // Maximum number of guesses allowed in the game

const resetGame = () => {
  // Reset the number of wrong guesses to zero
  wrongGuessCount = 0;
  // Reset the array of correct letters to an empty array
  correctLetters = [];
  // Update the source of the hangmanImage to the zero guess image
  hangmanImage.src = `/SITE/resources/images/hangman-${wrongGuessCount}.svg`;
  // Update the guessesText to display the correct number of guesses
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  // Enable all buttons on the keyboard
  keyboardDiv
    .querySelectorAll("button")
    .forEach((button) => (button.disabled = false));
  // Re-generate the word display with empty letters
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  // Remove the "show" class from the gameModal to hide it
  gameModal.classList.remove("show");
};

//
// Function to get a random word and hint from the word list.
const getRandomWord = () => {
  // Select a random word and hint from the word list.
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];

  // Log the selected word to the console for testing purposes.
  console.log(word);

  // Set the currentWord variable to the selected word.
  currentWord = word;

  // Update the hint text on the webpage with the selected hint.
  document.querySelector(".hint-text b").innerText = hint;

  resetGame();
  // Generate HTML list items representing each letter of the word.
  // Set the innerHTML of the wordDisplay element to the generated HTML.
};

const gameOver = (isVictory) => {
  // Wait a little bit before displaying the game over modal
  setTimeout(() => {
    // Set the text of the modal header based on if the player won or lost
    const modalText = isVictory
      ? `You found the word:`
      : `The correct word was:`;
    gameModal.querySelector("h4").innerText = isVictory
      ? `Congratulations!`
      : `Game Over!`;
    // Set the source of the modal image based on if the player won or lost
    gameModal.querySelector("img").src = `resources/images/${
      isVictory ? `victory` : "lost"
    }.gif`;
    // Set the innerHTML of the modal paragraph to include the modalText and the currentWord
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    // Add the "show" class to the gameModal to make it visible
    gameModal.classList.add("show");
  }, 300);
};

// Define a function called initGame that takes a button and a clickedLetter as parameters
const initGame = (button, clickedLetter) => {
  // Check if the current word includes the clicked letter
  if (currentWord.includes(clickedLetter)) {
    // Iterate over each letter in the current word
    [...currentWord].forEach((letter, index) => {
      // If a letter matches the clicked letter
      if (letter === clickedLetter) {
        correctLetters.push(letter); // Add the letter to the array of correct letters
        // Update the inner text of the corresponding list item in wordDisplay
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        // Add the "guessed" class to the corresponding list item in wordDisplay
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // If the clicked letter is not found in the current word
    wrongGuessCount++; // Increment the wrong guess count
    // Update the source of the hangmanImage based on the wrong guess count
    hangmanImage.src = `/SITE/resources/images/hangman-${wrongGuessCount}.svg`;
  }

  // Disable the button to prevent further guesses
  button.disabled = true;

  // Update the guessesText to display the current number of wrong guesses
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  // Check if the wrong guess count is equal to the maximum allowed guesses
  if (wrongGuessCount === maxGuesses) return gameOver(false); // If true, call gameOver with false parameter
  // Check if the number of correct letters is equal to the length of the current word
  if (correctLetters.length === currentWord.length) return gameOver(true); // If true, call gameOver with true parameter
};
// Create keyboard buttons from a-z
// Create a button for each letter of the alphabet
// Loop through the ASCII values of a-z (97-122)
for (let i = 97; i <= 122; i++) {
  // Create a new button element
  const button = document.createElement("button");
  // Set the innerText of the button to the corresponding letter
  button.innerText = String.fromCharCode(i);
  // Add the button to the keyboardDiv
  keyboardDiv.appendChild(button);
  // Add an event listener to the button that calls initGame with the button element and the corresponding letter
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
  // This event listener calls initGame with the button element that was clicked and the corresponding letter
  // initGame will then check if the current word includes the clicked letter, update the hangman image and display, and end the game if necessary
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
