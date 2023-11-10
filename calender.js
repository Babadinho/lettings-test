import { groupTasksByDueDate } from './task.js';

const currentDate = document.querySelector('.calender__current');
const daysElement = document.querySelector('.calender__days');
const prevNextIcon = document.querySelectorAll('.calender__icons span');

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const setCurrentDate = () => {
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

  daysElement.innerHTML = '';

  for (let i = firstDayOfMonth; i > 0; i--) {
    daysElement.innerHTML += `<li class="inactive">${
      lastDateOfLastMonth - i + 1
    }</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear();

    daysElement.innerHTML += `<li class="${isToday ? 'active' : ''}">${i}</li>`;
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    daysElement.innerHTML += `<li class="inactive">${
      i - lastDayOfMonth + 1
    }</li>`;
  }

  currentDate.textContent = `${months[currMonth]} ${currYear}`;
};

setCurrentDate();

prevNextIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    currMonth = icon.id === 'previous' ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      currMonth = date.getMonth();
      currYear = date.getFullYear();
    } else {
      date = new Date();
    }
    setCurrentDate();
  });
});

// Function to check tasks and display the count
function displayTaskCounts() {
  const tasksByDueDate = groupTasksByDueDate();
  const dayElements = document.querySelectorAll('.calender__days li');
  const today = new Date();

  dayElements.forEach((dayElement) => {
    const dayDate = new Date(
      currYear,
      currMonth,
      parseInt(dayElement.textContent, 10)
    ).toDateString();
    const tasksForDay = tasksByDueDate[dayDate];
    const spanElement = document.createElement('span');

    if (tasksForDay) {
      spanElement.textContent = ` ${tasksForDay.length}`;

      // Check if the day is in the past
      if (today > new Date(dayDate)) {
        spanElement.classList.add('expired');
      } else {
        spanElement.classList.add('upcoming');
      }
    }

    dayElement.appendChild(spanElement);
  });
}

displayTaskCounts();

export function updateTaskCounts() {
  displayTaskCounts();
}
