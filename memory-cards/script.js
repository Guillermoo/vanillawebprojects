const newCardBtn = document.getElementById('show');
const nextCardBtn = document.getElementById('next');
const prevCardBtn = document.getElementById('prev');
const currentPagination = document.getElementById('current');
const clearCardsBtn = document.getElementById('clear');
const addCardCont = document.getElementById('add-container');
const hideCardCont = document.getElementById('hide');
const addCardBtn = document.getElementById('add-card');
const questionField = document.getElementById('question');
const answerField = document.getElementById('answer');
const cardsCont = document.getElementById('cards-container');

let cards;
let activeCardIndex = 0;

newCardBtn.addEventListener('click', toggleAddCardScreen);
hideCardCont.addEventListener('click', toggleAddCardScreen);
addCardBtn.addEventListener('click', addNewCard);
clearCardsBtn.addEventListener('click', removeActiveCard);
cardsCont.addEventListener('click', flipCard);
nextCardBtn.addEventListener('click', nextCard);
prevCardBtn.addEventListener('click', prevCard);

class Card {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }

  createElementCard(el, isActive) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    //console.log(isActive.isEmpty);
    isActive != '' ? newCard.classList.add('active') : '';

    newCard.innerHTML = `  
        <div class="inner-card">
            <div class="inner-card-front">
                <p><h3>Question:</h3></p>
                <p>
                ${this.question}
                </p>
                </div>    
                <div class="inner-card-back">
                <p><h3>Answer:</h3></p>
                <br>
                <p>
                ${this.answer}
                </p>
            </div>    
        </div>
      `;
    el.appendChild(newCard);
  }

  saveCard(mycards) {
    console.log(this);
    console.log(mycards);

    //Save on array
    mycards === null ? (mycards = [this]) : mycards.push(this);
    localStorage.setItem('Cards', JSON.stringify(mycards));
    return mycards;
  }
}

function flipCard() {
  //console.log(e);
  const activeCard = this.querySelector('.active');
  activeCard.classList.toggle('show-answer');
}

function nextCard() {
  if (activeCardIndex === cards.length - 1) return;

  activeCardIndex += 1;
  showCards(cards, activeCardIndex);
  updateUI(activeCardIndex, cards.length);
}

function prevCard() {
  if (activeCardIndex === 0) return;
  activeCardIndex -= 1;

  showCards(cards, activeCardIndex);
  updateUI(activeCardIndex, cards.length);
}

function clearForm() {
  questionField.value = '';
  answerField.value = '';
}

//Make last card active
function removeActiveCard(el = '') {
  cardsCont.innerHTML = '';
  currentPagination.innerHTML = '';
  localStorage.clear();
  activeCardIndex = 0;
}

function addNewCard(e) {
  e.preventDefault();

  qst = questionField.value;
  answ = answerField.value;

  if (!qst || !answ) return;

  let newCard = new Card(qst, answ);
  cards = newCard.saveCard(cards, newCard);

  removeActiveCard(cardsCont);
  newCard.createElementCard(cardsCont);
  clearForm();
  toggleAddCardScreen();

  showCards(cards, activeCardIndex);
  updateUI(activeCardIndex, cards.length);
}

function toggleAddCardScreen() {
  addCardCont.classList.toggle('show');
}

function showCards(mycards, activeIndex) {
  cardsCont.innerHTML = '';
  mycards.map((card, i) => {
    Object.setPrototypeOf(card, Card.prototype);
    console.log(card);
    card.createElementCard(cardsCont, i === activeIndex ? 'active' : '');
  });
}

function updateUI(current, totalCards) {
  currentPagination.innerHTML = `${current + 1} / ${totalCards}`;
}

function init() {
  cards = JSON.parse(localStorage.getItem('Cards'));
  if (!cards) return;
  activeCardIndex = 0;
  showCards(cards, activeCardIndex); // active Index = 0, first Card
  updateUI(activeCardIndex, cards.length); // Pagination 1/4
}

init();
