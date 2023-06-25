const button = document.getElementById("games");
const darkKnight = document.getElementById("dark-knight");
const Senua = document.getElementById("senua");

darkKnight.addEventListener("mouseenter", function () {
  darkKnight.style.transform = "scale(1.1)";
  Senua.style.transform = "scaleX(0.9)";
  Senua.style.transformOrigin = "right";
});

darkKnight.addEventListener("mouseleave", function () {
  Senua.style.transform = "scaleX(1)";
  darkKnight.style.transform = "scale(1)";
});

Senua.addEventListener("mouseenter", function () {
  Senua.style.transform = "scale(1.1)";
  darkKnight.style.transform = "scaleX(0.9)";
  darkKnight.style.transformOrigin = "left";
});

Senua.addEventListener("mouseleave", function () {
  darkKnight.style.transform = "scaleX(1)";
  Senua.style.transform = "scale(1)";
});
