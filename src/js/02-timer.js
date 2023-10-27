import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

btnStart.setAttribute('disabled', true);

const timerInterval = 1000;
let currentDate = new Date();
let selectedDate = null;
let timeToFinish = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleDateSelection,
};

flatpickr("#datetime-picker", options);
btnStart.addEventListener('click', handleStartButtonClick);

let intervalId = null;

function handleDateSelection(selectedDates) {
  selectedDate = selectedDates[0];
  timeToFinish = selectedDate - currentDate;

  if (timeToFinish > 0) {
    btnStart.removeAttribute('disabled');
  } else {
    Notify.failure('Будь ласка, виберіть дату в майбутньому', { timeout: 2000 });
    btnStart.setAttribute('disabled', true);
  }
}

function handleStartButtonClick() {
  if (timeToFinish > 0) {
    startTimer();
    btnStart.setAttribute('disabled', true);
    dateTimePicker.setAttribute('disabled', true);
  }
}

function startTimer() {
  intervalId = setInterval(updateTimer, timerInterval);
}

function updateTimer() {
  timeToFinish -= timerInterval;
  if (timeToFinish < 1000) {
    stopTimer();
    Notify.success('Час завершено', { timeout: 2000 });
  }
  updateInterface();
}

function stopTimer() {
  clearInterval(intervalId);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  const changeFormatDays = days.toString().padStart(2, "0");
  const changeFormatHours = hours.toString().padStart(2, "0");
  const changeFormatMinutes = minutes.toString().padStart(2, "0");
  const changeFormatSeconds = seconds.toString().padStart(2, "0");

  return { changeFormatDays, changeFormatHours, changeFormatMinutes, changeFormatSeconds };
}

function updateInterface() {
  const formattedTime = addLeadingZero(convertMs(timeToFinish));
  dataDays.textContent = formattedTime.changeFormatDays;
  dataHours.textContent = formattedTime.changeFormatHours;
  dataMinutes.textContent = formattedTime.changeFormatMinutes;
  dataSeconds.textContent = formattedTime.changeFormatSeconds;
}