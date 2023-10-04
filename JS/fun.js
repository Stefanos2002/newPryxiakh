document.addEventListener("DOMContentLoaded", () => {
  const x = document.getElementById("xicon");
  const input = document.getElementById("bar");
  const controller = document.getElementById("controller-img");
  const drop = document.getElementById("list");
  const options = drop.options;

  input.style.width = "35vw";
  x.style.display = "none";
  //appear th X icon when something is written something
  input.addEventListener("input", function () {
    if (input.value.length > 0) {
      controller.style.right = "32px";
      x.style.display = "inline-block";
      x.style.opacity = 1;
      input.style.width = "37vw";
      // Clear the input field value
      x.addEventListener("click", function () {
        input.value = "";
        x.style.opacity = 0;

        input.style.width = "35vw";
        controller.style.right = "6px";
      });
    } else {
      controller.style.right = "6px";
      x.style.opacity = 0;

      input.style.width = "35vw";
    }
  });

  drop.addEventListener("mouseover", function () {
    drop.style.width = "132px";
  });
  drop.addEventListener("mouseleave", function () {
    drop.style.width = "25px";
    //closes down the dropdown list
    drop.blur();
  });
});
