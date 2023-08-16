import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('[name=delay]'),
  stepInput: document.querySelector('[name=step]'),
  amountInput: document.querySelector('[name=amount]'),
};

let delay = null;
let step = null;
let amount = null;

refs.form.addEventListener('input', onInput);
refs.form.addEventListener('submit', onSubmit);

function onInput(e) {
  switch (e.target) {
    case refs.delayInput:
      delay = Number(e.target.value);
      break;
    case refs.stepInput:
      step = Number(e.target.value);
      break;
    case refs.amountInput:
      amount = Number(e.target.value);
      break;
  }
}

function onSubmit(e) {
  e.preventDefault();
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
