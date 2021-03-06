const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrongLetters");
const playAgainBtn = document.getElementById("playAgainBtn");
const playAgainBtn2 = document.getElementById("playAgainBtn2");
const showWordBtn = document.getElementById("showWordBtn");
const popup = document.getElementById("popupContainer");
const notification = document.getElementById("notificationContainer");
const finalMessage = document.getElementById("finalMessage");
const playAgainContainer = document.querySelector(".play-again-container");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "encourage",
  "programming",
  "brother",
  "pretty",
  "uncle",
  "dynamic",
  "payment",
  "meat",
  "sparkle",
  "cactus",
  "science",
  "chess",
  "undesirable",
  "education",
  "challenger",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Display words on screen
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) =>
          `<span class="letter">${
            correctLetters.includes(letter) ? letter : ""
          }</span>`
      )
      .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won.";
    popup.style.display = "flex";
    showWordBtn.style.display = "none";
  }
}

// Update wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost";
    popup.style.display = "flex";
    showWordBtn.style.display = "block";
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Show word
function showWord() {
  popup.style.display = "none";

  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map((letter) => `<span class="letter">${letter}</span>`)
      .join("")}`;

  playAgainContainer.style.display = "block";
}

// Keyboard letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Play again button
playAgainBtn.addEventListener("click", () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

// Play Again after showing word
playAgainBtn2.addEventListener("click", () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
  playAgainContainer.style.display = "none";
});

displayWord();

// Show word if user lost at the end
showWordBtn.addEventListener("click", showWord);
