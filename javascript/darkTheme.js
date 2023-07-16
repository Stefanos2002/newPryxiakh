const theme = document.querySelector('.theme');
const btn = document.querySelector('.button');

btn.addEventListener('click', ()=> {
    theme.classList.toggle('dark-mode');
});
