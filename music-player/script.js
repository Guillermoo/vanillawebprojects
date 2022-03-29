'use strict';

const audioPlayer = document.getElementById('audio');
const backBtn = document.getElementById('prev');
//const iconBtn = document.querySelector('.fas');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const musicContainer = document.querySelector('.music-container');
const progressEl = document.getElementById('progress');
const titleEl = document.getElementById('title');

playBtn.addEventListener('click', managePlayer);

function managePlayer(e) {
  console.log(e.target.className);
  console.log(e.target.querySelector('.fas'));
  e.target.classList.contains('fa-play') || e.target.classList.contains('play')
    ? playSong(e.target)
    : pauseSong(e.target);
}

function playSong() {
  audioPlayer.play();

  console.log(iconBtn);
  iconBtn.classList.remove('fa-play');
  iconBtn.classList.add('fa-pause');

  showSong();
}

function showSong() {
  titleEl.innerHTML = '';
  console.log(audioPlayer.name);
}

function pauseSong(icon) {
  audioPlayer.pause();
  icon.classList.add('fa-play');
  icon.classList.remove('fa-pause');
}
