const form = document.getElementById('form');

document.addEventListener('DOMContentLoaded', () => {

form.addEventListener('submit',async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch('/sign_up', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if(response.ok) {
            alert(data.message);
        }
        else {
            const errorList = document.getElementById('error');
            errorList.innerHTML = '';   

            data.errors.forEach(error => {
                const li = document.createElement('li');
                li.innerText = error;
                errorList.appendChild(li);
            });
        }
    } catch(err) {
        console.error(`Error: ${err}`);
    }
});
});