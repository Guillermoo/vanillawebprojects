'use strict';

const allCtrls = document.querySelector('.controls');
const allBtns = document.querySelectorAll('.btn');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const videoPlayer = document.getElementById('video');
const timeStmp = document.getElementById('timestamp');
const slider = document.getElementById('progress');

let interval;

allCtrls.addEventListener('click', function (e) {
  e.preventDefault();

  handleButtons(this, e.target);
});

videoPlayer.addEventListener('click', function (e) {
  e.preventDefault();

  allCtrls.querySelector('#play > i').classList.remove('fa-play');
  allCtrls.querySelector('#play > i').classList.add('fa-pause');
  startInterval();
  videoPlayer.play();
});

function minTommss(minutes) {
  var sign = minutes < 0 ? '-' : '';

  var min = Math.floor(Math.abs(minutes) / 60);
  var sec = Math.floor(minutes - min * 60);
  var x = min < 10 ? '0' + min : min;
  var y = sec < 10 ? '0' + sec : sec;
  return x + ':' + y;
}

function startInterval() {
  slider.max = video.duration;
  interval = setInterval(() => {
    timeStmp.innerHTML = minTommss(video.currentTime);
    slider.value = video.currentTime;
    if (slider.value == video.duration) console.log('finnn');
  }, 10);
}

function stopInvertal(interval) {
  clearInterval(interval);
  timeStmp.innerHTML = '00:00';
}
function pauseInvertal(time) {
  console.log(interval);
  clearInterval(interval);
  interval = time;
}

function handleButtons(container, btn) {
  //console.log(btn);
  if (btn.classList.contains('fa-play')) {
    btn.classList.remove('fa-play');
    btn.classList.add('fa-pause');
    startInterval();
    videoPlayer.play();
  } else if (btn.classList.contains('fa-pause')) {
    btn.classList.add('fa-play');
    btn.classList.remove('fa-pause');
    videoPlayer.pause();
    pauseInvertal(videoPlayer.currentTime);
  } else if (btn.classList.contains('fa-stop')) {
    container.querySelector('#play > i').classList.add('fa-play');
    container.querySelector('#play > i').classList.remove('fa-pause');
    videoPlayer.pause();
    stopInvertal(interval);
    videoPlayer.currentTime = 0;
    slider.value = 0;
  } else if (btn.classList.contains('progress')) {
    pauseInvertal(videoPlayer.currentTime);

    console.log(btn);
    console.log(btn.value);
    //video.currentTime = btn.value;
    timeStmp.innerHTML = minTommss(video.currentTime);
    //startInterval();
  }
}
