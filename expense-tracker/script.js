const listExpensesEl = document.getElementById('list');
const form = document.querySelector('#form');
const txtValue = document.querySelector('#text');
const amountValue = document.querySelector('#amount');

let transactions = [];

document.addEventListener('click', manageDelete);

form.addEventListener('submit', manageForm);

function manageDelete(e) {
  //   console.log(e);
  //   console.log(e.target);
  if (e.target.classList.contains('delete-btn')) {
    const btnDelete = e.target;
    const id = btnDelete.parentNode.id;
    deleteTransaction(id, transactions);
    deleteEl(id);
    console.log(transactions);
    setLocalStorage(localStorage);
  }
}

function deleteEl(id) {
  const transEl = document.getElementById(id);
  console.log(transEl);
  console.log(listExpensesEl);

  listExpensesEl.removeChild(transEl);
}

function deleteTransaction(id, trans) {
  trans.find((t, i) => (t.id === id ? trans.splice(i, 1) : ''));
  //delete trans[transToDelete];
  //console.log(trans);
}

function manageForm(e) {
  e.preventDefault();

  if (!txtValue.value || !amountValue.value) {
    alert('Please add a text and amount');
    return;
  }

  addExpense(txtValue.value, amountValue.value);
}

function init() {
  transactions = getLocalStorage();
  console.log(transactions);
  showData(transactions);

  // transactions.
}

function addExpense(txt, amount) {
  console.log(txt, amount);

  const newTransaction = {
    id: getRandomId(),
    name: txt,
    amount: +amount,
  };

  console.log(newTransaction);
  console.log(transactions);
  transactions === null
    ? (transactions = [newTransaction])
    : transactions.push(newTransaction);

  setLocalStorage(transactions);
  updateDOM(newTransaction);
}

function createHTML(trans) {
  let type = '';
  let sign = '';
  if (trans.amount > 0) {
    type = 'plus';
    sign = '+';
  } else {
    type = 'minus';
    sign = '-';
  }
  const markUpTrans = `<li id=${trans.id} class="${type}">${
    trans.name
  }<span>${parseInt(
    trans.amount
  )}</span><button class="delete-btn">x</button></li>`;

  return markUpTrans;
}

function updateDOM(trans) {
  const transEl = createHTML(trans);
  listExpensesEl.insertAdjacentHTML('beforeend', transEl);
  txtValue.value = '';
  amountValue.value = '';
}

function showData(trans) {
  if (!trans) return;
  console.log(trans);
  const htmlTrans = trans.map((t) => createHTML(t));
  listExpensesEl.innerHTML = [...htmlTrans].join('');
}

function getRandomId() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

// Get data from localstorage
// function loadData() {
//   const transaction = {
//     id: getRandomId(),
//     name: 'trans1',
//     amount: 23,
//   };
//   const transaction2 = {
//     id: getRandomId(),
//     name: 'trans2',
//     amount: -43,
//   };
//   transactions.push(transaction);
//   transactions.push(transaction2);

//   // return localStorage.getItem('transactions');
//   return transactions;
// }

function getLocalStorage() {
  const trans = localStorage.getItem('transactions');
  console.log(trans);
  return JSON.parse(trans);
}

function setLocalStorage(trans) {
  if (!trans) return;

  console.log(trans);
  localStorage.setItem('transactions', JSON.stringify(trans));
}

init();
