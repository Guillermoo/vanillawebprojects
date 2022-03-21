'use strict';

const btnToggle = document.getElementById('toggle');
const btnOpen = document.getElementById('open');
const navBar = document.getElementById('navbar');
const modalContainer = document.getElementById('modal');
const btnCloseModal = document.getElementById('close');

btnToggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);

// Show modal when clck SignUp
btnOpen.addEventListener('click', () =>
  modalContainer.classList.toggle('show-modal')
);

// Close modal when click button close
btnCloseModal.addEventListener('click', () =>
  modalContainer.classList.toggle('show-modal')
);

//Hide modal when click out modal
modalContainer.addEventListener('click', (e) =>
  e.target === modalContainer
    ? modalContainer.classList.toggle('show-modal')
    : false
);
