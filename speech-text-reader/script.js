const mainContainer = document.getElementsByTagName('main');
const textBoxContainer = document.getElementById('text-box');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const voicesSelector = document.getElementById('voices');
const readBtn = document.getElementById('read');
const textField = document.getElementById('text');

let synth = window.speechSynthesis;
let voices = synth.getVoices();
let utterThis = new SpeechSynthesisUtterance();

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

toggleBtn.addEventListener('click', showToggleTextBox);
closeBtn.addEventListener('click', showToggleTextBox);
readBtn.addEventListener('click', readSentence);
voicesSelector.addEventListener('change', setVoice);

function setVoice(e) {
  console.log(e.target);
  utterThis.voice = voices[e.target.selectedIndex];
}

function showToggleTextBox() {
  textField.value = '';
  textBoxContainer.classList.toggle('show');
}

function readSentence(e) {
  e.preventDefault();

  saySentence(textField.value, voicesSelector.selectedIndex);
}

const checkBrowserCompatibility = () => {
  'speechSynthesis' in window
    ? console.log('Web Speech API supported!')
    : console.log('Web Speech API not supported :-(');
};

/**
 * sentence to speech, index language in voices
 * @param {*} sentence
 * @param {*} index
 */
function saySentence(sentence, index) {
  utterThis.text = sentence;
  if (index) utterThis.voice = voices[index];
  synth.speak(utterThis);
}

/**
 * Print all boxes from data
 */
function createBoxActions(mydata) {
  mydata.map((action) => {
    const boxCont = document.createElement('div');
    boxCont.innerHTML = `
    <img src="${action.image}" alt="${action.text}">
    `;

    const infoCont = document.createElement('p');
    infoCont.classList.add('info');
    infoCont.innerText = action.text;
    boxCont.appendChild(infoCont);
    boxCont.classList.add('box');

    // boxCont.addEventListener('click', speechText);
    boxCont.addEventListener('click', () => {
      saySentence(action.text, voicesSelector.selectedIndex);
      boxCont.classList.add('active');
      setTimeout(() => {
        boxCont.classList.remove('active');
      }, 800);
    });
    mainContainer[0].insertAdjacentElement('beforeend', boxCont);
  });
}

/** Load voices on selector element */
function loadVoices() {
  //console.log(voices);
  voices.map((voice) => {
    const option = document.createElement('option');
    //console.log(voice);
    option.text = voice.name + ' ' + voice.lang;
    option.value = voice.name;
    voicesSelector.appendChild(option);
  });
}

function init() {
  checkBrowserCompatibility();
  createBoxActions(data);
  loadVoices();
}

init();
