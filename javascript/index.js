const video = document.getElementById("video1");
const poster = document.getElementById("senua");
const videoContainer = document.getElementById("games");

videoContainer.addEventListener("mouseenter", function () {
  video.play();
  poster.style.display = "none"; // Hide the poster image
});

videoContainer.addEventListener("mouseleave", function () {
  video.pause();
  poster.style.display = "block"; // Show the poster image
});
