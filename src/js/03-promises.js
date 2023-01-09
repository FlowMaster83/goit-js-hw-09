import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmitClick);

function onFormSubmitClick(event) {
  event.preventDefault();

  let firstDelay = Number(event.target.delay.value);
  const delayStep = Number(event.target.step.value);
  const amount = Number(event.target.amount.value);

  event.currentTarget.reset();

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay).then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    firstDelay += delayStep;
  }
}
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
    // Fulfill
    resolve({ position, delay });
  } else {
    // Reject
    reject({ position, delay });
  }
}, delay);
})
return promise;
}
