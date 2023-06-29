const senuaPoster = document.querySelector(".senua");
const batmanPoster = document.querySelector(".dark-knight");
const videoContainer = document.getElementById("games");
const gamesText = document.getElementById("games-text");
const moviesText = document.getElementById("movies-text");
const clip = document.querySelectorAll(".clip");
let isPlaying = false;
console.log(isPlaying);

senuaPoster.addEventListener("mouseenter", () => {
  handleMouseEnter(senuaPoster);
});

batmanPoster.addEventListener("mouseenter", () => {
  handleMouseEnter(batmanPoster);
});

//Function gia ton elegxo tou hover stis eikones
function handleMouseEnter(poster) {
  poster.style.transition = "1s ease-in-out";
  setTimeout(() => {
    poster.style.opacity = "0";
    poster.style.pointerEvents = "none";
  }, 650);

  for (let i = 0; i < clip.length; i++) {
    clip[i].addEventListener("mouseover", () => {
      isPlaying = true;
      console.log(isPlaying);
      setTimeout(function () {
        if (isPlaying === true) {
          clip[i].play();
        }
      }, 750);
    });

    clip[i].addEventListener("mouseleave", () => {
      isPlaying = false;
      console.log(isPlaying);
      clip[i].pause();
    });
  }
}
