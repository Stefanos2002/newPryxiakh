document.addEventListener("DOMContentLoaded", () => {
  const x = document.getElementById("xicon");
  const input = document.getElementById("bar");
  const controller = document.getElementById("controller-img");

  //appear th X icon when something is written something
  input.addEventListener("input", function () {
    if (input.value.length > 0) {
      x.style.display = "inline-block";
      x.style.opacity = 1;
      // input.style.paddingRight = "20em";
      // Clear the input field value
      x.addEventListener("click", function () {
        input.value = "";
        x.style.opacity = 0;

        //input.style.width = "28vw";

        controller.style.right = "6px";
      });
    } else {
      controller.style.right = "6px";
      x.style.opacity = 0;
    }
  });
});
