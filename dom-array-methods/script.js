const MAX_WEALTH = 1000000;
const MIN_WEALTH = 200000;

const mainTable = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');

let persons = [];

addUserBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const newPerson = getNewPerson();
  newPerson.then((person) => {
    printPerson(person);
  });
});

doubleMoneyBtn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('double');
});

const getDataAPI = async function () {
  try {
    const repUrl = `https://randomuser.me/api/`;

    fetch(repUrl)
      .then((res) => res.json())
      .then((data) => {
        const { first, last } = data['results'][0]['name'];
      });
  } catch {}
};

const formatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
});

function createRandomWealth() {
  return Math.floor(Math.random() * (MAX_WEALTH - MIN_WEALTH + 1) + MIN_WEALTH);
}

function addPerson(person) {
  persons.push(person);
}

function getRandomPersons() {
  try {
    const repUrl = `https://randomuser.me/api/?results=5&?exc=gender,location,email,login,registered,dob,phone,cell,id,picture,nat`;

    fetch(repUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data['results'].forEach((person) => {
          const { first, last } = person['name'];
          const newperson = {
            first: first,
            last: last,
            wealth: formatter.format(createRandomWealth()),
          };

          addPerson(newperson);
          //printPerson(person);
        });
      });
  } catch (err) {
    console.log(err);
  }
}

async function getNewPerson() {
  try {
    const repUrl = `https://randomuser.me/api/?exc=gender,location,email,login,registered,dob,phone,cell,id,picture,nat`;

    const res = await fetch(repUrl);
    const data = await res.json();
    const user = data.results[0];
    const person = {
      first: user['name']['first'],
      last: user['name']['last'],
      wealth: formatter.format(createRandomWealth()),
    };

    persons.push(person);

    return person;
  } catch (err) {
    console.error(err);
  }
}

function printPerson(person) {
  const personDiv = document.createElement('div');
  personDiv.classList.add('person');

  const markUp = `
    <strong>${person['first']} ${person['last']}</strong> ${person['wealth']}
    `;

  personDiv.innerHTML = markUp;
  mainTable.appendChild(personDiv);
}

function printPersons(myPersons) {
  console.log(myPersons);
  console.log(typeof myPersons);

  myPersons.forEach((person) => {
    console.log(person);
    const personDiv = document.createElement('div');
    personDiv.classList.add('person');

    const markUp = `
    <strong>${person['title']} ${person['first']} ${person['last']}</strong> ${person['wealth']}
    `;

    personDiv.innerHTML = markUp;
    mainTable.appendChild(personDiv);
    console.log(markUp);
    console.log(personDiv);
  });
  console.log(myPersons);
}

/* function createPerson(person) {
  console.log(person);
  const personDiv = document.createElement('div');
  personDiv.classList.add('person');

  const markUp = `
  <strong>${person['title']} ${person['first']} ${person['last']}</strong> ${person['wealth']}
  `;

  personDiv.innerHTML = markUp;
  mainTable.appendChild(personDiv);
  console.log(markUp);
  console.log(personDiv);
} */

function init() {
  //getNewPerson();
  getRandomPersons();

  const mypersons = [
    { first: 'Tamara', last: 'Berry', wealth: '366.170,00 €' },
    { first: 'Alba', last: 'Gil', wealth: '872.134,00 €' },
  ];

  printPersons(persons);
}

//init();
