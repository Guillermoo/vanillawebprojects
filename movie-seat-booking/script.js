'use strict';

// Select dom elements
const movieSelector = document.querySelector('#movie');
const allSeats = document.querySelector('.container');
const numberSeatsSelected = document.querySelector('#count');
const totalPrice = document.querySelector('#total');

window.addEventListener('load', function () {
  loadSelectedSeats();

  countSeats();
  calculateTotalPrice();
});

movieSelector.addEventListener('change', function () {
  calculateTotalPrice();
});

allSeats.addEventListener('click', function (e) {
  const selectedSeat = e.target;

  if (!selectedSeat.classList.contains('seat')) return;

  !selectedSeat.classList.contains('occupied')
    ? selectedSeat.classList.toggle('selected')
    : '';

  saveSeats();
  countSeats();
  calculateTotalPrice();
});

/** Add class 'selected' at seat index passed by array */
function setSelectedSeats(seatsSelected) {
  const [...cinemaSeats] = allSeats.querySelectorAll('.seat');
  cinemaSeats.some(function (seat, i) {
    seatsSelected.includes(i) && !seat.classList.contains('occupied')
      ? seat.classList.add('selected')
      : '';
  });
}

/** Get items from localstorage   */
function loadSelectedSeats() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (!selectedSeats) return;

  setSelectedSeats(selectedSeats);
}

/** Return an array with the index of the selected seats */
function getSelectedSeats() {
  const [...cinemaSeats] = allSeats.querySelectorAll('.seat');

  let seatsArray = [];

  cinemaSeats.map((seat, i) =>
    seat.classList.contains('selected') ? seatsArray.push(i) : ''
  );

  return seatsArray;
}

function countSeats() {
  const seats = allSeats.querySelectorAll('.selected');

  numberSeatsSelected.innerHTML = seats.length;
}

function calculateTotalPrice() {
  totalPrice.innerHTML = numberSeatsSelected.innerHTML * movieSelector.value;
}

function saveSeats() {
  const seatsToSave = getSelectedSeats();

  if (!seatsToSave) return;

  localStorage.setItem('selectedSeats', JSON.stringify(seatsToSave));
}
//localStorage.clear();
