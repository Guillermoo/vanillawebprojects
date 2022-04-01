'use strict';

const wordToType = document.getElementById('word');
const textEl = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameCont = document.getElementById('end-game-container');
const selectoEl = document.getElementById('difficulty');

const values = {
  easy: 15,
  medium: 10,
  difficult: 5,
};

let secondsLeft = 10;

let myInterval;
//let score = 0;

textEl.addEventListener('keyup', checkWord);

function rightWord() {
  scoreEl.innerText++;
  textEl.value = '';

  startNewGame();
}

function wrongWord() {
  score--;
}

function checkWord(e) {
  e.preventDefault();
  textEl.value === wordToType.innerText ? rightWord() : '';
}

async function getRandomWord() {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=1`
  );

  const data = await res.json();
  return data;
}

function showWord(word) {
  wordToType.innerText = word;
}

function showLoseMessager() {
  const markUpMessage = `
        <h1>Time ran out</h1>
        <p>Your final score is ${scoreEl.innerText}</p>
        <button onclick="location.reload()">Reload</button>
    `;

  endGameCont.innerHTML = markUpMessage;
  endGameCont.style.display = 'flex';
}

function gameLost() {
  showLoseMessager();
  clearInterval(myInterval);
}

function updateTimer() {
  timeEl.innerText = `${secondsLeft}s`;
  secondsLeft === 0 ? gameLost() : '';
  secondsLeft--;
}

function resetTimer() {
  //console.log();
  secondsLeft = values[selectoEl.value];
  myInterval = setInterval(updateTimer, 1000);
}

async function startNewGame() {
  clearInterval(myInterval);
  resetTimer();

  const word = await getRandomWord();
  showWord(word);
}

function init() {
  startNewGame();

  textEl.value = '';
  scoreEl.innerHTML = 0;
}

init();
