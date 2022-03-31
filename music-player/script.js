'use strict';

const audioPlayer = document.getElementById('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const coverEl = document.getElementById('cover');
const musicContainer = document.querySelector('.music-container');
const progressEl = document.getElementById('progress');
const progressCont = document.getElementById('progress-container');
const titleEl = document.getElementById('title');

const songs = ['hey', 'summer', 'ukulele'];
let indexSong = 2;

playBtn.addEventListener('click', managePlay);
nextBtn.addEventListener('click', manageSwitch);
prevBtn.addEventListener('click', manageSwitch);

audioPlayer.addEventListener('timeupdate', setWidth);
progressCont.addEventListener('click', clickSlider);

// Gets audio file duration
audioPlayer.addEventListener(
  'canplaythrough',
  function () {
    progressEl.max = audioPlayer.duration;
    console.log(progressEl.max);
  },
  false
);

function clickSlider(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (clickX / width) * duration;
}

function setWidth(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${progressPercent}%`;
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
  setWidth();
}

function showSong(audioSrc) {
  musicContainer.classList.add('play');

  //last element from array
  let nameSong = audioSrc.split('/').reverse()[0].replace('.mp3', '');
  cover.src = `images/${nameSong}.jpg`;
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
