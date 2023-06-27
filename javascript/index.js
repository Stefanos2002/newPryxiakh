const video = document.getElementById("video1");
const poster = document.getElementById("senua");
const videoContainer = document.getElementById("games");
const clip = document.querySelectorAll(".clip");
let isPlaying = false;

for (let i = 0; i < clip.length; i++) {
  clip[i].addEventListener("mouseenter", () => {
    isPlaying = true;
    setTimeout(function() {
      if(isPlaying === true)
        clip[i].play();
    }, 650);
    clip[i].volume = 0.1;
  });

  clip[i].addEventListener("mouseleave", () => {
    isPlaying = false;
    clip[i].pause();
  });
}
