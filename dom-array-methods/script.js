const MAX_WEALTH = 1000000;
const MIN_WEALTH = 200000;

const persons = [];

const getDataAPI = async function () {
  try {
    const repUrl = `https://randomuser.me/api/`;

    fetch(repUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { title, first, last } = data['results'][0]['name'];
        console.log(title, first, last);
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

async function getNewPerson() {
  try {
    const repUrl = `https://randomuser.me/api/`;

    fetch(repUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { title, first, last } = data['results'][0]['name'];

        console.log(data['results'][0]['name']);
        const person = {
          title: title,
          first: first,
          last: last,
          wealth: formatter.format(createRandomWealth()),
        };

        persons.push(person);
        console.log(persons);
      });
  } catch {}
}

function init() {
  getNewPerson();

  console.log(persons);
}

init();
