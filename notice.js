const tasksList = document.querySelector('.task__list');
const total = document.querySelector('.notice__total');
const upcoming = document.querySelector('.notice__upcoming');
const expired = document.querySelector('.notice__expired');
const greeting = document.querySelector('.notice__greet');

const userName = localStorage.getItem('userName');

greeting.querySelector('span').innerHTML = userName;

const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
const currentDate = new Date();

const upcomingTasks = storedTasks.filter((task) => {
  const dueDate = new Date(task.dueDate);
  return dueDate > currentDate;
});

const expiredTasks = storedTasks.filter((task) => {
  const dueDate = new Date(task.dueDate);
  return dueDate < currentDate;
});

const upcomingTaskCount = upcomingTasks.length;
const expiredTaskCount = expiredTasks.length;

total.querySelector('span').textContent = storedTasks.length;
upcoming.querySelector('span').textContent = upcomingTaskCount;
expired.querySelector('span').textContent = expiredTaskCount;
