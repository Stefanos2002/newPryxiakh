const video = document.getElementById("my-video");
const poster = document.getElementById("dark-knight");
const videoContainer = document.getElementById("movies");

videoContainer.addEventListener("mouseenter", function () {
  video.play();
  poster.style.display = "none"; // Hide the poster image
});

videoContainer.addEventListener("mouseleave", function () {
  video.pause();
  poster.style.display = "block"; // Show the poster image
});
