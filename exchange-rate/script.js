const API_KEY = 'd96b88a98cf1d45d463be3ca';
const selCurrencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const selCurrencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');
const btnSwap = document.getElementById('swap');
const displayRate = document.getElementById('rate');

amountOne.addEventListener('change', function (e) {
  const currency = selCurrencyOne.value;
  const currencyTo = selCurrencyTwo.value;

  if (!currency) return;
  getCurrencyFromDataAPI(currency, currencyTo);
});

btnSwap.addEventListener('click', function () {
  const one = selCurrencyOne.value;
  const two = selCurrencyTwo.value;

  selCurrencyOne.value = two;
  selCurrencyTwo.value = one;

  getCurrencyFromDataAPI(selCurrencyOne.value, selCurrencyTwo.value);
});

selCurrencyOne.addEventListener('change', function (e) {
  const currency = e.target.value;
  const currencyTo = selCurrencyTwo.value;

  if (!currency) return;

  getCurrencyFromDataAPI(currency, currencyTo);
});

selCurrencyTwo.addEventListener('change', function (e) {
  const currency = selCurrencyOne.value;
  const currencyTo = e.target.value;

  if (!currency) return;

  getCurrencyFromDataAPI(currency, currencyTo);
});

function showConversion(amount, convertedamount, curr1, curr2) {
  displayRate.innerHTML = `${amount} ${curr1} = ${
    convertedamount * amount
  } ${curr2}`;
  amountTwo.value = convertedamount * amount;
}

const getDataAPI = async function (currency) {
  try {
    const repUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency}`;
    return await new Promise((resolve, reject) => {
      fetch(repUrl)
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (error) {
    console.log(error);
  }
};

function getCurrencyFromDataAPI(currency, currencyTo) {
  const data = getDataAPI(currency);
  data.then((result) => {
    showConversion(
      amountOne.value,
      result['conversion_rates'][currencyTo],
      currency,
      currencyTo
    );
  });
}

getCurrencyFromDataAPI(selCurrencyOne.value, selCurrencyTwo.value);
