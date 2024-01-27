//Exercițiul 2 - cronometru cu numărătoare inversă
//Îndepliniți acest task în fișierele 02-timer.html și 02-timer.js. Scrieți un script pentru un timer care n
//umără invers până la o anumită dată.Un astfel de cronometru poate fi folosit în bloguri și magazine online,
//pagini de înregistrare pentru un eveniment, în timpul mentenanței unui produs etc.Urmăriți filmulețul demonstrativ al cronometrului./
//Elementele interfeței web
//HTML-ul de mai jos are deja un marcaj gata făcut pentru cronometru, câmpuri pentru selectarea datei și un buton pe care
//atunci când este făcut click, va porni cronometrul.Adăugați un design minim pentru elementele din interfață.
//Librăria flatpickr
//Folosiți librăria flatpickr pentru a permite utilizatorului să selecteze data și ora de încheiere, folosind doar un element
//al interfeței indiferent de tipul browser - ului.Pentru a conecta codul CSS al librăriei, adăugați încă un
//import față de cel menționat în documentație.
// Descris în documentație
//import flatpickr from "flatpickr";
// Import suplimentar de stil
//import "flatpickr/dist/flatpickr.min.css";
//Librăria așteaptă să fie inițializată pe un element input[type="text"], așa că am adăugat un câmp input#datetime-picker
//în documentul HTML.
//<input type="text" id="datetime-picker" />
//Al doilea argument al funcției flatpickr(selector, options) poate fi un obiect opțional cu parametri.
//Am pregătit deja obiectul de care vei avea nevoie pentru a finaliza acest task.Încercați să înțelegeți ce face
// fiecare proprietate, citind documentația "Options".Utilizați - o apoi, în codul dvs.
//const options = {
// enableTime: true,
// time_24hr: true,
//defaultDate: new Date(),
// minuteIncrement: 1,
//onClose(selectedDates) {
//   console.log(selectedDates[0]);
//  },
//};
//Selectarea datei
//Metoda onClose() din obiectul cu parametri este apelată de fiecare dată când un element al interfeței
//creat de flatpickr este închis.Exact aici ar trebui procesată data selectată de către utilizator.Parametrul
//selectedDates este o matrice cu date selectate, deci luăm doar primul element.
//Dacă utilizatorul a selectat o dată în trecut, afișați window.alert() cu textul "Please choose a date in the future".
//Dacă utilizatorul a selectat o dată validă (în viitor), butonul "Start" devine activ.
//Butonul "Start" trebuie dezactivat până când utilizatorul a selectat o dată în viitor.
//Atunci când se dă click pe butonul "Start", se începe numărătoarea inversă până la data selectată.
//Numărătoarea inversă
//Când se dă click pe butonul "Start", scriptul va calcula o dată pe secundă cât timp a mai rămas până la
//data specificată și va actualiza interfața cronometrului, arătând patru cifre: zile, ore, minute și secunde în
//formatul xx: xx: xx: xx.

//Numărul de zile poate fi format din două sau mai multe cifre.
//Cronometrul ar trebui să se oprească atunci când ajunge la data de încheiere, adică 00:00:00:00.
//SĂ NU NE COMPLICĂM
//Dacă cronometrul rulează, pentru a selecta o nouă dată și a o reporni, trebuie reîncărcată pagina.

//Pentru a calcula valorile, există funcția convertMs - unde ms este diferența în milisecunde dintre data de
//încheiere și data curentă.
//function convertMs(ms) {
  // Number of milliseconds per unit of time
 // const second = 1000;
  //const minute = second * 60;
  //const hour = minute * 60;
  //const day = hour * 24;

  // Remaining days
  //const days = Math.floor(ms / day);
  // Remaining hours
  //const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  //const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  //const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  //return { days, hours, minutes, seconds };
//}

//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

//Formatarea orei
//Funcția convertMs() returnează un obiect cu timpul rămas până la data de încheiere. Aceasta nu formatează rezultatul. Adică, dacă au mai rămas 4 minute, atunci funcția va returna 4, nu 04. În interfața timer-ului, trebuie adăugat 0 dacă există mai puțin de două caractere într-un număr. Scrieți o funcție addLeadingZero(value) care va folosi metoda padStart() și formata valoarea înainte de a fi introdusă în interfață.

//Librăria de notificări
//ATENȚIE
//Această funcționalitate nu este necesară la trimiterea acestui task, dar va fi un exercițiu suplimentar destul de bun.

//Pentru a afișa notificări către utilizator, în loc de window.alert(), puteți folosi librăria notiflix.




import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

Notiflix.Notify.init({ position: 'center-top' });

const dateInputEl = document.querySelector('#datetime-picker');
const startButtonEl = document.querySelector('[data-start]');
const daysFieldEl = document.querySelector('[data-days]');
const hoursFieldEl = document.querySelector('[data-hours]');
const minutesFieldEl = document.querySelector('[data-minutes]');
const secondsFieldEl = document.querySelector('[data-seconds]');
let selectedDate;
let timerId;

startButtonEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDate = selectedDates[0];
      if (selectedDate.getTime() > options.defaultDate.getTime()) {
        startButtonEl.disabled = false;
      } else {
        startButtonEl.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
      }
    },
};

const fp = flatpickr(dateInputEl, options);

const handleOnClick = () => {
    timerId = setInterval(() => {
        const currentDate = new Date();
        const ms = selectedDate.getTime() - currentDate.getTime();
        if (selectedDate.getTime() <= currentDate.getTime()) {
            clearInterval(timerId);
            return;
        }

        const timeLeft = convertMs(ms);
        daysFieldEl.textContent = addZero(timeLeft.days);
        hoursFieldEl.textContent = addZero(timeLeft.hours);
        minutesFieldEl.textContent = addZero(timeLeft.minutes);
        secondsFieldEl.textContent = addZero(timeLeft.seconds);
    }, 1000)

    startButtonEl.setAttribute("disabled", "");
}

startButtonEl.addEventListener("click", handleOnClick);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addZero(value) {
    return value.toString().padStart(2, '0')
  }
  
