const theme = document.querySelector('.theme');
const btn = document.querySelector('.button');
const icon = document.querySelector('.button-icon');
const body = document.querySelector('body');
const navBar = document.querySelector('.nav-bar');
const linkColor = document.querySelector('.article-link');
const entryCard = document.querySelector('.entry-card');
let darkTheme = false;

//function gia na apothikeuei to dark mode topika
function store(value) {
    localStorage.setItem('dark-mode', value);
}


const darkmode = localStorage.getItem('dark-mode');
//An to darkmode den exei energopoihthei akoma
if (darkmode === null) {
    store(false);
    icon.classList.add('fa-sun');   //icons tou font-awesome
    linkColor.style.color = 'black'
}
//Epeidh xrhsimopoiw localStorage to true kai to false gyrnane ws strings
//An to darkmode exei energopoihthei
else if (darkmode === 'true') {
    theme.classList.add('dark-mode');
    icon.classList.add('fa-moon')
}
//An to darkmode exei energopoihthei alla to dark theme einai apenergopoihmeno
else
    icon.classList.add('fa-sun')



btn.addEventListener('click', () => {
    theme.classList.toggle('dark-mode');
    icon.classList.add('animated');

    store(theme.classList.contains('dark-mode'));

    if (theme.classList.contains('dark-mode')) {
        darkTheme = true;
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    else {
        darkTheme = false;
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    if (darkTheme === true) {
        body.style.transition = '0.6s ease-in-out';
        body.style.backgroundColor = '#2b2b2b';
        body.style.color = '#ececec';
        navBar.style.transition = '0.6s ease-in-out';
        navBar.style.backgroundColor = '#141418'
        linkColor.style.color = 'white'
        linkColor.style.transition = '0.6s ease-in-out';
        entryCard.style.backgroundColor = '#2a2a2a';
        entryCard.style.transition = '0.6s ease-in-out';
    }
    else {
        body.style.transition = '0.6s ease-in-out';
        body.style.backgroundColor = 'rgb(231, 231, 231)';
        body.style.color = 'black';
        navBar.style.transition = '0.6s ease-in-out';
        navBar.style.backgroundColor = '#23232e'
        linkColor.style.color = 'black'
        linkColor.style.transition = '0.6s ease-in-out';
        entryCard.style.backgroundColor = 'white';
        entryCard.style.transition = '0.6s ease-in-out';
    }
    setTimeout(() => {
        icon.classList.remove('animated');
    }, 500);
});
