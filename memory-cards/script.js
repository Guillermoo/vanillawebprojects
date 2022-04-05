const newCardBtn = document.getElementById('show');
const nextCardBtn = document.getElementById('next');
const prevCardBtn = document.getElementById('prev');
const clearCardsBtn = document.getElementById('clear');
const addCardCont = document.getElementById('add-container');
const hideCardCont = document.getElementById('hide');
const addCardBtn = document.getElementById('add-card');
const questionField = document.getElementById('question');
const answerField = document.getElementById('answer');
const cardsCont = document.getElementById('cards-container');

newCardBtn.addEventListener('click', showScreenAddCard);
hideCardCont.addEventListener('click', showScreenAddCard);
addCardBtn.addEventListener('click', addNewCard);
clearCardsBtn.addEventListener('click', removeActiveCard);

let cards;

class Card {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }

  createElementCard(el) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.classList.add('active');

    newCard.innerHTML = `  
        <div class="inner-card">
            <div class="inner-card-front">
                <p>
                ${this.question}
                </p>
            </div>    
            <div class="inner-card-back">
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
    //mycards.push(this);
    mycards === null ? (mycards = [this]) : mycards.push(this);
    localStorage.setItem('Cards', JSON.stringify(mycards));
    //return mycards;
  }
}

function clearForm() {
  questionField.value = '';
  answerField.value = '';
}

function removeActiveCard(el = '') {
  cardsactive = el.querySelectorAll('.active ');
  cardsactive.forEach((card) => card.classList.remove('active'));
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
}

function showScreenAddCard() {
  addCardCont.classList.toggle('show');
}

function showCards(mycards) {
  mycards.map((card) => {
    Object.setPrototypeOf(card, Card.prototype);
    console.log(card);
    card.createElementCard(cardsCont);
  });
}

function init() {
  cards = JSON.parse(localStorage.getItem('Cards'));
  if (!cards) return;
  showCards(cards);
}

init();
