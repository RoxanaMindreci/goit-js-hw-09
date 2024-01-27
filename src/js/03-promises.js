//Exercițiul 3 - generator de promise-uri
//Îndepliniți acest task în fișierele 03-promises.html și 03-promises.js. Urmăriți filmulețul demonstrativ al generatorului 
//de promise - uri.

//HTML-ul de mai jos conține un marcaj de formular în care utilizatorul va introduce prima întârziere în
//milisecunde, apoi pasul pentru creșterea întârzierii pentru fiecare promise și numărul de promise - uri care urmează a fi create.

//Scrieți un script care, atunci când se trimite un formular, apelează funcția createPromise(position, delay) de atâtea ori de câte este specificat în câmpul amount. La fiecare apel, transmiteți-i numărul promise-ului creat (position) și întârzierea ținând cont de primul (delay) introdus de utilizator și pasul (step).

//Modificați codul funcției createPromise astfel încât să returneze un promise care va fi executat sau respins 
//după un delay.Valoarea promise - ului trebuie să fie un obiect care conține proprietățile position și delay 
//cu valorile parametrilor ce au același nume.Utilizați codul funcției inițiale pentru a alege ce vei face 
//cu acel promise - fie executat sau respins.

//createPromise(2, 1500)
//  .then(({ position, delay }) => {
//    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//  })
//  .catch(({ position, delay }) => {
//    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//  });


import Notiflix from 'notiflix';

Notiflix.Notify.init({ position: 'center-top' });

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const result = {position, delay}
      if (shouldResolve) {
        // Fulfill
        resolve(result) 
       } else {
        // Reject
        reject(result)
        }
    }, delay);
  });
}

formEl.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  event.preventDefault();
  let delayValue = Number(delayEl.value);
  const stepValue = Number(stepEl.value);
  const amountValue = Number(amountEl.value);
  formEl.reset();

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue) // 
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`); // 
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`); // 
    });

    delayValue += stepValue;
  }
}