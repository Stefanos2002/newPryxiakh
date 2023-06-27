const video = document.getElementById("video1");
const poster = document.getElementById("senua");
const videoContainer = document.getElementById("games");
const clip = document.querySelectorAll("clip");

videoContainer.addEventListener("mouseenter", function () {
  setTimeout(function () {
    video.play();
  }, 650);
  video.volume = 0.1;
  poster.style.display = "none";
});

videoContainer.addEventListener("mouseleave", function () {
  video.pause();
  poster.style.display = "block";
});

for (let i = 0; i < clip.length; i++) {
  clip[i].addEventListener("mouseenter", () => {
    clip[i].play();
  });
  clip[i].addEventListener("mouseleave", () => {
    clip[i].pause();
  });
}
