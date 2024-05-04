const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
// Sets up word list
let currentWord;
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
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    console.log(clickedLetter, " does not exist in word");
  }
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
