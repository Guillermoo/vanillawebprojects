'use strict';

const audioPlayer = document.getElementById('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const musicContainer = document.querySelector('.music-container');
const progressEl = document.getElementById('progress');
const progressCont = document.getElementById('progress-container');
const titleEl = document.getElementById('title');

const songs = ['hey', 'summer', 'ukulele'];
let indexSong = 2;

playBtn.addEventListener('click', managePlay);
nextBtn.addEventListener('click', manageSwitch);
prevBtn.addEventListener('click', manageSwitch);

audioPlayer.addEventListener('timeupdate', manageSlider, false);
progressCont.addEventListener('click', clickSlider, false);

// Gets audio file duration
audioPlayer.addEventListener(
  'canplaythrough',
  function () {
    progressEl.max = audioPlayer.duration;
  },
  false
);

function clickSlider(e) {
  console.log(e);
  console.log(e.clientWidth);
  console.log(this.clientWidth);
  console.log(progressEl.value);

  //console.log(progressEl.style.width);
  //console.log(progressEl.style.width.replace('px', ''));
  // audioPlayer.currentTime = progressEl.style.width.replace('px', '');
}

function manageSlider() {
  progressEl.style.width = `${audioPlayer.currentTime}px`;
}

function managePlay() {
  playBtn.querySelector('.fas').classList.contains('fa-play')
    ? playSong(playBtn.querySelector('.fas'))
    : pauseSong(playBtn.querySelector('.fas'));
}

function manageSwitch(e) {
  e.currentTarget.querySelector('.fas').classList.contains('fa-forward')
    ? nextIndex()
    : prevIndex();

  audioPlayer.src = `music/${songs[indexSong]}.mp3`;
  playSong(playBtn.querySelector('.fas'));
}

function nextIndex() {
  indexSong === songs.length - 1 ? (indexSong = 0) : indexSong++;
}

function prevIndex() {
  indexSong === 0 ? (indexSong = songs.length - 1) : indexSong--;
}

function playSong(iconBtn) {
  audioPlayer.play();

  iconBtn.classList.remove('fa-play');
  iconBtn.classList.add('fa-pause');

  showSong(audioPlayer.src);
  manageSlider();
}

function showSong(audioSrc) {
  musicContainer.classList.add('play');

  //last element from array
  let nameSong = audioSrc.split('/').reverse()[0].replace('.mp3', '');

  titleEl.innerHTML = nameSong;
}

function pauseSong(icon) {
  audioPlayer.pause();
  musicContainer.classList.remove('play');
  icon.classList.add('fa-play');
  icon.classList.remove('fa-pause');
}

function init() {
  audioPlayer.src = `music/${songs[indexSong]}.mp3`;
}

init();
