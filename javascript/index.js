/*TODO
1) Na paizei to video sto hover sto text (fixed)
2) Na mhn paizei to video sthn grigori enallagh apo poster se poster (fixed)*/

//HTML elements
const senuaPoster = document.querySelector(".senua");
const batmanPoster = document.querySelector(".dark-knight");
const clip = document.querySelectorAll(".clip");
const videoContainer = document.querySelectorAll(".video-container");

//Metavlhtes
let hoverImages;

window.addEventListener('DOMContentLoaded', function () { //giati evgaze error sto poster.style.transition gia kapoio logo
  senuaPoster.addEventListener("mouseenter", () => {
    handleMouseEnter(senuaPoster);
  });
  senuaPoster.addEventListener("mouseleave", () => {
    this.clearTimeout(hoverImages);
  });

  batmanPoster.addEventListener("mouseenter", () => {
    handleMouseEnter(batmanPoster);
  });

  //new aspects
  batmanPoster.onmouseover = function () {
    window.mytimeout = setTimeout(function () {
      handleMouseEnter(poster);
    }, 2000);
  };

  batmanPoster.onmouseout = function () {
    clearTimeout(window.mytimeout);
  };


  //Function gia ton elegxo tou hover stis eikones
  function handleMouseEnter(poster) {
    poster.style.transition = "1s ease-in-out";
    setTimeout(() => {
      poster.style.opacity = "0";
      poster.style.pointerEvents = "none";
    }, 650);


    for (let i = 0; i < videoContainer.length; i++) {
      let isMouseOver = false;
      videoContainer[i].addEventListener("mouseover", () => {
        isMouseOver = true;
        setTimeout(() => {
          if (isMouseOver === true) 
            clip[i].play();
        }, 525);
      });

      videoContainer[i].addEventListener("mouseleave", () => {
        isMouseOver = false;
        clip[i].pause();
      });
    }
  }
});