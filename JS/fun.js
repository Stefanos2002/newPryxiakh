document.addEventListener("DOMContentLoaded", () => {
  const x = document.getElementById("xmen");
  const input = document.getElementById("bar");
  const drop = document.getElementById("list");

  //appear th X icon when something is written something
  input.addEventListener("input", function () {
    if (input.value.length > 0) {
      x.style.display = "inline";
      // Clear the input field value
      x.addEventListener("click", function () {
        input.value = "";
        x.style.display = "none";
        input.style.width = "35vw";
      });
      input.style.width = "37vw";
    } else {
      x.style.display = "none";
      input.style.width = "35vw";
    }
  });
  drop.addEventListener("mouseover", function () {});
});
