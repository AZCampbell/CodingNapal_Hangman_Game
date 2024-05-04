const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
// Sets up word list
let currentWord,
  wrongGuessCount = 0;
const maxGuesses = 6;

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

  // Generate HTML list items representing each letter of the word.
  // Set the innerHTML of the wordDisplay element to the generated HTML.
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};

const initGame = (button, clickedLetter) => {
  // Check if the current word includes the clicked letter
  if (currentWord.includes(clickedLetter)) {
    // Iterate over each letter in the current word
    [...currentWord].forEach((letter, index) => {
      // If a letter matches the clicked letter
      if (letter === clickedLetter) {
        // Update the inner text of the corresponding list item in wordDisplay
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        // Add the "guessed" class to the corresponding list item in wordDisplay
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // If the clicked letter is not found in the current word
    // Increment the wrongGuessCount variable
    wrongGuessCount++;
    // Update the source of the hangmanImage based on the wrongGuessCount
    hangmanImage.src = `/SITE/resources/images/hangman-${wrongGuessCount}.svg`;
  }

  // Disable the button to prevent further guesses
  button.disabled = true;

  // Update the guessesText to display the current number of wrong guesses
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
};
// Create keyboard buttons from a-z
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRandomWord();
