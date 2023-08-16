import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};

let timeDiff = null;
let isActive = false;

refs.startBtn.setAttribute('disabled', '');
refs.startBtn.addEventListener('click', startCountdown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: [
    function (selectedDates) {
      if (selectedDates[0].getTime() - options.defaultDate.getTime() < 0) {
        Notify.failure('Please choose a date in the future');
        refs.startBtn.setAttribute('disabled', '');
        return;
      }
      refs.startBtn.removeAttribute('disabled');
      timeDiff = selectedDates[0].getTime() - options.defaultDate.getTime();
    },
  ],
};
flatpickr('input#datetime-picker', options);

function startCountdown() {
  if (isActive) return;
  isActive = true;
  const intervalId = setInterval(() => {
    timeDiff -= 1000;
    if (timeDiff < 0) {
      clearInterval(intervalId);
      return;
    }
    refs.timerDays.textContent = convertMs(timeDiff).days;
    refs.timerHours.textContent = convertMs(timeDiff).hours;
    refs.timerMinutes.textContent = convertMs(timeDiff).minutes;
    refs.timerSeconds.textContent = convertMs(timeDiff).seconds;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
