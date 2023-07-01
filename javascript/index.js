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
    let isMouseOver = false;
    let hoverTimeout;

    clip[i].addEventListener("mouseover", () => {
      isMouseOver = true;
      setTimeout(function () {
        if (isMouseOver === true) {
          clip[i].play();
        }
      }, 530);
    });

    clip[i].addEventListener("mouseleave", () => {
      isMouseOver = false;
      clearTimeout(hoverTimeout);
      clip[i].pause();
    });
  }
}
