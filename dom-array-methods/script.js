const MAX_WEALTH = 1000000;
const MIN_WEALTH = 200000;

const mainTable = document.getElementById('main');

const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionairsBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcWealth = document.getElementById('calculate-wealth');

let persons = [];

addUserBtn.addEventListener('click', function (e) {
  e.preventDefault();

  getRandomPersons(1);
});

doubleMoneyBtn.addEventListener('click', function (e) {
  e.preventDefault();
  persons = persons.map((person) => {
    //Devuelvo la persona en array
    return { ...person, wealth: person.wealth * 2 };
  });

  clearList();
  printPersons(persons);
});

showMillionairsBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (!persons) return '';

  persons = persons.filter((person) => person.wealth > 1000000);
  printPersons(persons);
});

sortBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (!persons) return '';

  persons = persons.sort(function (a, b) {
    return b.wealth - a.wealth;
  });

  printPersons();
});

calcWealth.addEventListener('click', function (e) {
  e.preventDefault();

  let sumWealth = persons.reduce((a, b) => {
    return a + b.wealth;
  }, 0);

  const htmlWealth = `<div><h3>Total Wealth: <strong>${formatMoney(
    sumWealth
  )}</strong></h3></div>`;

  mainTable.insertAdjacentHTML('beforeend', htmlWealth);
});

function clearList() {
  mainTable.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
}

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function createRandomWealth() {
  return Math.floor(Math.random() * 1000000);
}

function addPerson(person) {
  persons.push(person);
}

async function getRandomPersons(number = 1) {
  try {
    const res = await fetch(
      `https://randomuser.me/api/?results=${number}&?exc=gender,location,email,login,registered,dob,phone,cell,id,picture,nat`
    );
    const data = await res.json();

    data.results.forEach((person) => {
      const newperson = {
        first: person['name'].first,
        last: person['name'].last,
        wealth: createRandomWealth(),
      };

      addPerson(newperson);
    });
    //clearList()
    printPersons();
  } catch (err) {
    console.log(err);
  }
}

function printPersons(myPersons = persons) {
  //console.log(myPersons.length);
  clearList();

  if (!myPersons) return '';

  myPersons.forEach((person) => {
    const personDiv = document.createElement('div');
    personDiv.classList.add('person');

    const markUp = `
    <strong>${person['first']} ${person['last']}</strong>${formatMoney(
      person['wealth']
    )}`;

    personDiv.innerHTML = markUp;
    mainTable.appendChild(personDiv);
    // console.log(markUp);
    // console.log(personDiv);
  });
}

function init() {
  getRandomPersons(3);

  printPersons();
}

init();
