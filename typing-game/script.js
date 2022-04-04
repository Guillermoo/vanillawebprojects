'use strict';

const wordToType = document.getElementById('word');
const textEl = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameCont = document.getElementById('end-game-container');
const selectoEl = document.getElementById('difficulty');
const settingBtn = document.getElementById('settings-btn');
const settingEl = document.getElementById('settings');

const dificultyTypes = {
  easy: 15,
  medium: 10,
  hard: 5,
};

let secondsLeft = 10;

let myInterval;

textEl.addEventListener('keyup', checkWord);
selectoEl.addEventListener('click', changeDifficulty);
settingBtn.addEventListener('click', () => settingEl.classList.toggle('hide'));

function rightWord() {
  scoreEl.innerText++;
  textEl.value = '';

  startNewGame(selectoEl.value);
}

function wrongWord() {
  score--;
}
function changeDifficulty() {
  const difValue = selectoEl.value;
  startNewGame(difValue);
  storeDifficulty(difValue);
}

function storeDifficulty(dif) {
  localStorage.setItem('difficulty', dif);
}
function restoreDifficulty() {
  const dif = localStorage.getItem('difficulty');
  return dif;
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

function showLoseMessager(score) {
  const markUpMessage = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

  endGameCont.innerHTML = markUpMessage;
  endGameCont.style.display = 'flex';
}

function gameLost(score) {
  showLoseMessager(score);
  clearInterval(myInterval);
}

function updateTimer() {
  timeEl.innerText = `${secondsLeft}s`;
  secondsLeft === 0 ? gameLost(scoreEl.innerText) : '';
  secondsLeft--;
}

function resetTimer(seconds) {
  //console.log();
  secondsLeft = seconds;
  myInterval = setInterval(updateTimer, 1000);
}

async function startNewGame(difficulty = 'medium') {
  timeEl.innerHTML = `${secondsLeft}s`;
  selectoEl.value = difficulty;
  clearInterval(myInterval);
  resetTimer(dificultyTypes[difficulty]);

  const word = await getRandomWord();
  showWord(word);
}

function init() {
  const dif = restoreDifficulty();

  !dif ? (dif = 'medium') : '';

  startNewGame(dif);

  textEl.value = '';
  scoreEl.innerHTML = 0;
}

init();
