import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const picker = document.querySelector('#datetime-picker');
const dataStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

dataStart.addEventListener('click', onBtnClick);
dataStart.disabled = true;
let dateCount = '';

flatpickr(picker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      dataStart.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      dataStart.disabled = false;
      dateCount = selectedDates[0];
    }
  },
});

function onBtnClick() {
  const interval = setInterval(function () {
    const today = Date.now();
    const chooseTime = dateCount - today;

    let msObject = convertMs(chooseTime);

    screenAllDate(msObject);

    if (chooseTime < 1000) {
      clearInterval(interval);
    }
  }, 1000);
}

function screenAllDate({ days, hours, minutes, seconds }) {
  dataDays.textContent = goToZero(days);
  dataHours.textContent = goToZero(hours);
  dataMinutes.textContent = goToZero(minutes);
  dataSeconds.textContent = goToZero(seconds);
}

function goToZero(value) {
  return value.toString().padStart(2, '0');
}

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