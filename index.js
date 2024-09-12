const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;

const MIN_NUMBER = 1;
const MAX_NUMBER = 99;
const MAX_ATTEMPTS = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  if (isNaN(guess) || guess < MIN_NUMBER || guess > MAX_NUMBER)
  {
    alert(`Please enter a valid number between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
    guessInput.value = '';
    guessInput.focus();
    return;
  }

  attempts++;
  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${attempts === 1 ? 'guess' : 'guesses'}`;

    correctMessage.style.display = '';
  displayGameInputs();
  } else {
    const message = guess < targetNumber ? tooLowMessage : tooHighMessage;
    message.style.display = '';
  
    const remainingAttempts = MAX_ATTEMPTS - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${remainingAttempts === 1 ? 'guess' : 'guesses'} remaining`;
    numberOfGuessesMessage.style.display = '';
  

  if (attempts === MAX_ATTEMPTS) {
    maxGuessesMessage.textContent = 'Game Over! No more guesses remaining.';
    maxGuessesMessage.style.display = '';
    disableGameInputs();
  }
}

  guessInput.value = '';

  resetButton.style.display = '';
  guessInput.focus();
}

function hideAllMessages() {
  for (let message of messages) {
    message.style.display = 'none';
  }
}

function disableGameInputs() {
  submitButton.disabled = true;
  guessInput.disabled = true;
}
function enableGameInputs() {
  submitButton.diabled = false;
  guessInput.disabled = false;
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(MIN_NUMBER, MAX_NUMBER);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  enableGameInputs();

  hideAllMessages();
  resetButton.style.display = 'none';
  guessInput.focus();
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();

