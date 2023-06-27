const video = document.getElementById("video1");
const senuaPoster = document.querySelector(".senua");
const batmanPoster = document.getElementById('dark-knight');
const videoContainer = document.getElementById("games");
const clip = document.querySelectorAll(".clip");
let isPlaying = false;

senuaPoster.addEventListener('mouseenter', () => {
  senuaPoster.style.transition = '0.8s ease-in-out'
  senuaPoster.style.visibility = 'hidden'
  for (let i = 0; i < clip.length; i++) {
    clip[i].addEventListener("mouseenter", () => {
      isPlaying = true;
      setTimeout(function () {
        if (isPlaying === true)
          clip[i].play();
      }, 650);
      clip[i].volume = 0.1;
    });

    clip[i].addEventListener("mouseleave", () => {
      isPlaying = false;
      clip[i].pause();
    });
  }
})

batmanPoster.addEventListener('mouseenter', () => {
  batmanPoster.style.transition = '0.8s ease-in-out'
  batmanPoster.style.visibility = 'hidden'
  for (let i = 0; i < clip.length; i++) {
    clip[i].addEventListener("mouseenter", () => {
      isPlaying = true;
      setTimeout(function () {
        if (isPlaying === true)
          clip[i].play();
      }, 650);
      clip[i].volume = 0.1;
    });

    clip[i].addEventListener("mouseleave", () => {
      isPlaying = false;
      clip[i].pause();
    });
  }
})
