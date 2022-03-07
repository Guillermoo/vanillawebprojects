'use strict';

const allCtrls = document.querySelector('.controls');
const allBtns = document.querySelectorAll('.btn');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const videoPlayer = document.getElementById('video');

allCtrls.addEventListener('click', function (e) {
  e.preventDefault();

  console.log(e.target);
  handleButtons(this, e.target);
});

// allBtns.forEach(function (btn) {
//   btn.addEventListener('click', function (e) {
//     e.preventDefault();
//     handleButtons(e.target);
//   });
// });

// playBtn.addEventListener('click', function (e) {
//   e.preventDefault();
//   //console.log(e.target);

//   handleButtons(e.target);
// });

// stopBtn.addEventListener('click', function (e) {
//   handleButtons(e.target);
// });

function handleButtons(container, btn) {
  if (btn.classList.contains('fa-play')) {
    btn.classList.remove('fa-play');
    btn.classList.add('fa-pause');
    videoPlayer.play();
  } else if (btn.classList.contains('fa-pause')) {
    btn.classList.add('fa-play');
    btn.classList.remove('fa-pause');
    videoPlayer.pause();
  } else if (btn.classList.contains('fa-stop')) {
    container.querySelector('#play > i').classList.add('fa-play');
    container.querySelector('#play > i').classList.remove('fa-pause');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  } else if (btn.classList.contains('progress')) {
    console.log('progress');
  }
}
