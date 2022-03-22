const myhead = document.querySelector('circle.figure-part');
const mylines = document.querySelectorAll('line.figure-part');
const wordContainer = document.getElementById('word');
const wrongLetterContainer = document.getElementById('wrong-letters');
const notificationContainer = document.getElementById('notification-container');
const popupContainer = document.querySelector('.popup-container');
const btnPlayAgain = document.getElementById('play-button');

let myWord = '';
let lettersFailed = [];
let lettersRight = [];

//myhead.style.display = 'block';

window.addEventListener('keypress', function (e) {
  const RegExpression = /^[a-zA-Z\s]*$/;

  if (RegExpression.test(e.key)) {
    checkLetter(e.key);
  }
});

btnPlayAgain.addEventListener('click', function () {
  cleanUI();
  startGame();
});

function startGame() {
  lettersFailed = [];
  const newword = getRandomWord();

  newword.then((theword) => {
    myWord = theword;
    // Set underscore
    setLetters(myWord);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  startGame();
});

function checkLetter(letter) {
  if (!myWord) return '';

  const arrayWord = [...myWord];
  if (arrayWord.includes(letter)) manageRightLetter(letter);
  else manageWrongLetter(letter);
}

function manageRightLetter(letter) {
  isAlready(lettersRight, letter)
    ? notifyRepeatedLetter(letter)
    : showRightLetter(letter);

  const wordGuessed = [...lettersRight];
  console.log(wordGuessed);
  console.log(myWord);

  wordGuessed.join('') === myWord
    ? showPopup('Congratulations! You won! 😃')
    : '';
}

function manageWrongLetter(letter) {
  isAlready(lettersFailed, letter)
    ? notifyRepeatedLetter(letter)
    : showWrongLetter(letter);

  manageStick(lettersFailed.length);
}

function notifyRepeatedLetter() {
  notificationContainer.classList.toggle('show');
  setTimeout(function () {
    notificationContainer.classList.toggle('show');
  }, 2200);
}

// Wrong Letter already typed
function isAlready(alreadyletters, letter) {
  if (alreadyletters.includes(letter)) {
    return true;
  }
  return false;
}

function showWrongLetter(letter) {
  //If first letter
  if (wrongLetterContainer.childNodes.length < 1) {
    const pEl = document.createElement('p');
    pEl.innerHTML = 'Wrong';
    wrongLetterContainer.appendChild(pEl);
  }

  let comaChar = '';
  if (wrongLetterContainer.childNodes.length > 1) {
    comaChar = ',';
  }
  const spanEl = document.createElement('span');
  spanEl.innerHTML = comaChar + letter;
  wrongLetterContainer.appendChild(spanEl);

  lettersFailed.push(letter);
}

function showRightLetter(letter) {
  wordContainer.childNodes[myWord.indexOf(letter)].innerHTML = letter;
  lettersRight.push(letter);
}

function manageStick(count) {
  //Show head
  count === 1 ? (myhead.style.display = 'block') : '';

  //You reach the max
  count === 6 ? showPopup('Unfortunately you lost. 😕') : '';

  //Add stick
  count > 1 ? (mylines[count - 2].style.display = 'block') : '';
}

function hidePopup() {
  popupContainer.style.display = 'none';
}

function showPopup(msg) {
  const finalmsg = popupContainer.querySelector('#final-message');

  popupContainer.style.display = 'flex';
  finalmsg.innerHTML = msg;
}

function cleanUI() {
  hidePopup();
  myhead.style.display = 'none';
  mylines.forEach((line) => (line.style.display = 'none'));
  wordContainer.innerHTML = '';
  wrongLetterContainer.innerHTML = '';
}

function setLetters(word) {
  const arrayWord = [...word];

  //each letter create a <span>
  arrayWord.forEach(() => {
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
    return myWord;
  } catch (err) {
    console.log(err);
  }
}
