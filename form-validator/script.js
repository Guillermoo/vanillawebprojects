'use strict';

const myForm = document.querySelector('.form');
const usernameField = document.querySelector('#username');
const emailField = document.querySelector('#email');
const passwField = document.querySelector('#password');
const passw2Field = document.querySelector('#password2');

myForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!checkRequired([usernameField, emailField, passwField, passw2Field])) {
    checkLength(usernameField, 3, 15);
    checkLength(passwField, 6, 25);
    checkPasswordsMatch(passwField, passw2Field);
    checkEmail(emailField);
  }
});

function checkEmail(email) {
  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(email.value);
  //const emailStr = email.value;
  if (!pattern.test(email.value)) {
    showError(email, `This email is not valid`);
  } else {
    showSuccess(email);
  }
}

function checkPasswordsMatch(pass, pass2) {
  // console.log(pass);
  // console.log(pass2);
  if (pass.value !== pass2.value) {
    showError(pass, `Password not matching`);
    showError(pass2, `Password not matching`);
  } else {
    showSuccess(pass);
    showSuccess(pass2);
  }
}

//check if empty string
function checkRequired(fields) {
  let isRequired = false;
  fields.forEach((field) => {
    //console.log(field);

    if (field.value === '') {
      showError(field, `This field is required`);
      isRequired = true;
    }
  });
  return isRequired;
}

function checkLength(field, minChar, maxChar) {
  //const stringSize = strng.length;
  // console.log(field);
  // console.log(field.value.length);
  // console.log(minChar);
  // console.log(maxChar);

  if (minChar < field.value.length || field.value.length < maxChar) {
    // console.log('errorrrrr');
    showSuccess(field);
    //return false;
  } else
    showError(
      field,
      `This field must have ${minChar} to ${maxChar} characters`
    );
  //return true;
}

function showSuccess(field) {
  field.parentElement.classList.remove('error');
  field.parentElement.classList.add('success');
}

// function cleanErrorField(fields) {
//   //console.log(field);
//   fields.forEach((field) => {
//     field.classList.remove('error');
//     const smallText = field.parentElement.querySelector('small');
//     smallText.innerHTML = '';
//     field;
//   });
// }

function showError(field, msg) {
  field.parentElement.classList.add('error');
  const smallText = field.parentElement.querySelector('small');
  smallText.innerHTML = msg;
  // el.classList.add('error');
  // const alertMsg = el.querySelector('small');
  // console.log(alertMsg);
  // alertMsg.innerHTML = msg;
  // //alertMsg.cla;
  // console.log(alertMsg);
  // //console.log(alertMsg);
}
