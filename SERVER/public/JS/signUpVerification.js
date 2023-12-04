//client-side code
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevents the default form submission behavior(prevents the browser to navigate to new page)

    const formData = new FormData(form); //FormData is a built-in JavaScript object that represents a set of key/value pairs representing form fields and their values.

    try {
      const response = await fetch("/sign_up", {
        //a POST request to the "/sign_up" endpoint. The body of the request is populated with the form data
        method: "POST",
        body: formData,
      });

      const data = await response.json(); // It returns a promise that resolves to the JavaScript object described by the JSON.

      const errorList = document.getElementById("error");
      errorList.innerHTML = ""; // Clear previous error messages

      //status code(200-299)
      if (response.ok) {
        console.log(data.message);
      } else {
        // const errorList = document.getElementById("error");
        // errorList.innerHTML = "";

        if (data.errors) {
          data.errors.forEach((error) => {
            //If there are errors, it iterates over them and appends each error as a list item (<li>) to the "error" element in the DOM.
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
