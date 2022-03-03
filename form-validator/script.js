'use strict';

const myForm = document.querySelector('.form');

myForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const myFields = e.target.querySelectorAll('.form-control');

  //console.log(myFields);

  myFields.forEach((field) => {
    const inputField = field.getElementsByTagName('input');
    if (!checkLength(inputField[0].id, inputField[0].value))
      showMessage('error', inputField[0].id);
    else console.log(`Pasamos ${inputField[0].value}`);
  });
  //   for (let i = 0; i < inputs.length; i++) {
  //     const input = inputs[i];
  //     checkRequired(input.value);
  //   }
});

// check if empty string
// function checkRequired(inputField) {
//   if (inputField[0].value) return true;
//   return false;
// }

function checkLength(field, strng) {
  let minChar = 0;
  let maxChar = 0;
  const stringSize = strng.length;

  if (field === 'password2' || field === 'email') return true;

  if (field === 'username') {
    minChar = 3;
    maxChar = 15;
  }
  if (field === 'password') {
    minChar = 6;
    maxChar = 25;
  }

  if (minChar < stringSize && stringSize < maxChar) return true;

  return false;
}

function showMessage(msg, sel) {
  console.log(`${msg}, ${sel}`);
}
