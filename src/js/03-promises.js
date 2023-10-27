import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const btnEl = document.querySelector('[type="submit"]');

formEl.addEventListener('submit', onSubmitClick);

function onSubmitClick(e) {
  e.preventDefault();

  let delay = +formEl.delay.value;
  const step = +formEl.step.value;
  const amount = +formEl.amount.value;

  let completedPromises = 0; 

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );

        completedPromises += 1;
        if (completedPromises === amount) {
          formEl.reset(); 
        }
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );

        completedPromises += 1;
        if (completedPromises === amount) {
          formEl.reset(); 
        }
      });

    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
   return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
