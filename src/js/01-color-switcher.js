//Îndepliniți acest task în fișierele 01-color-switcher.html și 01-color-switcher.js. 
//Urmăriți filmulețul demonstrativ al comutatorului.

//În codul HTML există butonul "Start" și "Stop".

//<button type="button" data-start>Start</button>
//<button type="button" data-stop>Stop</button>

//Scrieți un script care, după apăsarea butonului "Start", o dată pe secundă schimbă culoarea de fundal a lui <body> 
//la o valoare aleatorie, folosind stilul inline.La click - ul butonului "Stop", schimbarea culorii de fundal se va opri.

//ATENȚIE
//Butonul "Start" poate fi apăsat de un număr infinit de ori. Faceți astfel încât, în timp ce schimbarea culorii de fundal 
//este activată, butonul "Start" să fie dezactivat(disabled).

///Puteți folosi funcția getRandomHexColor pentru a genera o culoare aleatorie.

//function getRandomHexColor() {
//  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
//}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId;

stopBtn.disabled = true;

const handleStartClick = () => {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

const handleStopClick = () => {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

startBtn.addEventListener('click', handleStartClick);
stopBtn.addEventListener('click', handleStopClick);
