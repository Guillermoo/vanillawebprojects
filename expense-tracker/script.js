const listExpensesEl = document.getElementById('list');
const form = document.querySelector('#form');
const txtValue = document.querySelector('#text');
const amountValue = document.querySelector('#amount');

const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('money-plus');
const expenseEl = document.getElementById('money-minus');

let transactions = [];

document.addEventListener('click', manageDelete);

form.addEventListener('submit', manageForm);

/**
 *
 * Only if it's delete btn trigger to remove the transaction
 *
 * @param {Element} e
 */
function manageDelete(e) {
  if (e.target.classList.contains('delete-btn')) {
    const btnDelete = e.target;
    const id = btnDelete.parentNode.id;
    deleteTransaction(id, transactions);
    deleteEl(id);
    setLocalStorage(transactions);
    updateBalance();
  }
}

/**
 * remove li element from list
 *
 * @param {number} id
 */
function deleteEl(id) {
  const transEl = document.getElementById(id);

  listExpensesEl.removeChild(transEl);
}

/**
 *
 * remove transaction from array of transactions
 * @param {number} id
 * @param {object} trans
 */
function deleteTransaction(id, trans) {
  trans.find((t, i) => (t.id === id ? trans.splice(i, 1) : ''));
}

function manageForm(e) {
  e.preventDefault();

  if (!txtValue.value || !amountValue.value) {
    alert('Please add a text and amount');
    return;
  }

  addExpense(txtValue.value, amountValue.value);
  updateDOM(transactions);
  updateBalance();
}

function init() {
  transactions = getLocalStorage();
  if (!Array.isArray(transactions)) return;

  updateDOM(transactions);
  updateBalance();
  // transactions.
}

/**
 *
 * Create a new expense and store on localstorage
 * @param {string} txt
 * @param {integer} amount
 */
function addExpense(txt, amount) {
  console.log(txt, amount);

  const newTransaction = {
    id: getRandomId(),
    name: txt,
    amount: +amount,
  };

  //No transactions added yet
  transactions === null
    ? (transactions = [newTransaction])
    : transactions.push(newTransaction);

  setLocalStorage(transactions);
}

/**
 * Get a transaction and create an li element to insert it into list element
 * @param {*} trans
 */
function createHTML(trans) {
  let type = '';
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
  listExpensesEl.insertAdjacentHTML('beforeend', markUpTrans);
}

/**
 * update list of transactions
 *
 * @param {Array transactions} trans
 * @returns
 */
function updateDOM(trans) {
  if (trans.length === 0) return;
  listExpensesEl.innerHTML = '';
  trans.map((t) => createHTML(t));

  txtValue.value = '';
  amountValue.value = '';
}

/**
 *
 */
function updateBalance() {
  const amounts = transactions.map((trans) => {
    return trans['amount'];
  });

  const income = amounts.reduce((acc, next) => {
    return next > 0 ? acc + next : acc;
  }, 0);

  const expense = amounts.reduce((acc, next) => {
    return next < 0 ? acc + next : acc;
  }, 0);

  incomeEl.innerHTML = `+$${income}`;
  expenseEl.innerHTML = `-$${Math.abs(expense)}`;
  balanceEl.innerHTML = `$${income + expense}`;
}

function getRandomId() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

/**
 *
 * @returns  JSON.parse(trans);
 */
function getLocalStorage() {
  const trans = localStorage.getItem('transactions');
  return JSON.parse(trans);
}

function setLocalStorage(trans = transactions) {
  if (!trans) return;
  //console.log(trans['transactions']);
  localStorage.setItem('transactions', JSON.stringify(trans));
}

init();
//localStorage.clear();
