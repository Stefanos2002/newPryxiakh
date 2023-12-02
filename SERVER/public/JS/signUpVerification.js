document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("/sign_up", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      const errorList = document.getElementById("error");
      errorList.innerHTML = ""; // Clear previous error messages

      if (response.ok) {
        console.log(data.message);
      } else {
        // const errorList = document.getElementById("error");
        // errorList.innerHTML = "";

        if (data.errors) {
          data.errors.forEach((error) => {
            const li = document.createElement("li");
            li.innerText = error;
            errorList.appendChild(li);
          });
        } else {
          console.error("Unexpected response format:", data);
        }
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  });
});
