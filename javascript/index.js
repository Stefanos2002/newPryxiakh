const video = document.getElementById("video1");
const senuaPoster = document.querySelector(".senua");
const batmanPoster = document.getElementById('dark-knight');
const videoContainer = document.getElementById("games");
const clip = document.querySelectorAll(".clip");
let isPlaying = false;
console.log(isPlaying)

senuaPoster.addEventListener('mouseenter', () => {
  handleMouseEnter(senuaPoster);
})

batmanPoster.addEventListener('mouseenter', () => {
  handleMouseEnter(batmanPoster);
})


//Function gia ton elegxo tou hover stis eikones
function handleMouseEnter(poster) {
  poster.style.transition = "0.8s ease-in-out";
  poster.style.visibility = "hidden";

  for (let i = 0; i < clip.length; i++) {
    clip[i].addEventListener("mouseenter", () => {
      isPlaying = true;
      console.log(isPlaying)
      setTimeout(function () {
        if (isPlaying === true) {
          clip[i].play();
        }
      }, 650);
      clip[i].volume = 0.1;
    });

    clip[i].addEventListener("mouseleave", () => {
      isPlaying = false;
      console.log(isPlaying)
      clip[i].pause();
    });
  }
}


