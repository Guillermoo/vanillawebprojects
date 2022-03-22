const myhead = document.querySelector('circle.figure-part');
const mylines = document.querySelectorAll('line.figure-part');
const wordContainer = document.getElementById('word');
const wrongLetterContainer = document.getElementById('wrong-letters');
const notificationContainer = document.getElementById('notification-container');

let myWord = '';
let lettersFailed = [];

//myhead.style.display = 'block';

window.addEventListener('keypress', function (e) {
  const RegExpression = /^[a-zA-Z\s]*$/;

  if (RegExpression.test(e.key)) {
    checkLetter(e.key);
  }
});

document.addEventListener('DOMContentLoaded', function (e) {
  // e.preventDefault();
  //getRandomWord();
  myWord = 'tiburon';

  setLetters(myWord);
});

function checkLetter(letter) {
  console.log(letter);
  if (!myWord) return '';

  const arrayWord = [...myWord];
  //   console.log(myWord);
  //   console.log(arrayWord);

  if (arrayWord.includes(letter)) showRightLetter(letter);
  else showWrongLetter(letter);
}

function repeatedWrongLetter(letter) {
  notificationContainer.classList.add('show');
  setTimeout(notificationContainer.classList.remove('show'), 3000);
}

function showRightLetter(letter) {
  console.log(`Right ${letter}`);
}
function showWrongLetter(letter) {
  if (lettersFailed.includes(letter)) {
    repeatedWrongLetter(letter);
    return '';
  }

  if (wrongLetterContainer.childNodes.length < 1) {
    const pEl = document.createElement('p');
    pEl.innerHTML = 'Wrong';
    wrongLetterContainer.appendChild(pEl);
  }
  console.log(wrongLetterContainer.childNodes);

  let comaChar = '';
  if (wrongLetterContainer.childNodes.length > 1) {
    comaChar = ',';
  }
  const spanEl = document.createElement('span');
  spanEl.innerHTML = comaChar + letter;
  wrongLetterContainer.appendChild(spanEl);

  lettersFailed.push(letter);
}

function setLetters(word) {
  const arrayWord = [...word];

  arrayWord.forEach((letter) => {
    const newSpan = document.createElement('span');
    newSpan.classList.add('letter');
    wordContainer.appendChild(newSpan);
  });
}

async function getRandomWord() {
  try {
    const res = await fetch(
      `https://random-word-api.herokuapp.com/word?number=1`
    );

    const data = await res.json();
    myWord = data[0];
  } catch (err) {
    console.log(err);
  }
}
