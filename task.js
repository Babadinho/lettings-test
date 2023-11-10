import { updateTaskCounts } from './calender.js';
const addTaskButtonModal = document.querySelector('.task__modal--button');
const taskInputModal = document.querySelector('.task__modal--input');
const tasksList = document.querySelector('.task__list');
const taskDueDateInput = document.getElementById('taskDueDate');
const taskModal = document.getElementById('taskModal');
const addTaskButton = document.getElementById('add');
const closeModalButton = document.getElementById('closeModal');

// load tasks from localStorage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  if (storedTasks.length === 0) {
    const noTasksMessage = document.createElement('p');
    noTasksMessage.textContent = 'No tasks yet';
    noTasksMessage.style.fontStyle = 'italic';
    tasksList.appendChild(noTasksMessage);
  } else {
    storedTasks.forEach((task) => {
      createTaskElement(task.text, new Date(task.dueDate));
    });
  }
}

// function to save task
function saveTasks() {
  const taskElements = tasksList.querySelectorAll('li');
  const tasks = Array.from(taskElements).map((taskElement) => ({
    text: taskElement.querySelector('p').textContent,
    dueDate: taskElement.dataset.dueDate,
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// function to create task
function createTaskElement(taskText, dueDate) {
  const taskItem = document.createElement('li');
  const taskTextParagraph = document.createElement('p');
  const taskAction = document.createElement('span');
  taskAction.innerHTML = '<i class="fa-solid fa-trash"></i>';
  taskTextParagraph.textContent = taskText;
  taskTextParagraph.appendChild(taskAction);
  taskItem.appendChild(taskTextParagraph);

  if (dueDate instanceof Date && !isNaN(dueDate)) {
    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = dueDate.toDateString();
    taskItem.appendChild(dueDateSpan);
    taskItem.dataset.dueDate = dueDate.toISOString();
  }

  tasksList.appendChild(taskItem);
}

// function to add task from modal
addTaskButtonModal.addEventListener('click', () => {
  const taskText = taskInputModal.value;
  const dueDate = taskDueDateInput._flatpickr.selectedDates[0];

  const noTasksMessage = tasksList.querySelector('p');
  if (noTasksMessage && tasksList.querySelectorAll('li').length === 0) {
    tasksList.removeChild(noTasksMessage);
  }

  if (taskText.trim() !== '' && dueDate) {
    createTaskElement(taskText, dueDate);
    taskInputModal.value = '';
    taskDueDateInput._flatpickr.clear();
    taskModal.style.display = 'none';
    saveTasks();
    updateTaskCounts();
  } else {
    alert('Please enter a task and select a due date.');
  }
});

flatpickr(taskDueDateInput, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  altFormat: 'F j, Y',
});

function deleteTask(taskItem) {
  const taskElements = tasksList.querySelectorAll('li');
  const tasks = Array.from(taskElements).filter(
    (taskElement) => taskElement !== taskItem
  );

  // Remove the task from the tasks list
  tasksList.removeChild(taskItem);

  // Update the tasks in localStorage
  const updatedTasks = tasks.map((taskElement) => ({
    text: taskElement.querySelector('p').textContent,
    dueDate: taskElement.dataset.dueDate,
  }));
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

tasksList.addEventListener('click', (event) => {
  if (event.target.classList.contains('fa-trash')) {
    const taskItem = event.target.closest('li');
    deleteTask(taskItem);
  }
});

addTaskButton.addEventListener('click', () => {
  taskModal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
  taskModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === taskModal) {
    taskModal.style.display = 'none';
  }
});

// group tasks by due date
export function groupTasksByDueDate() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const tasksByDueDate = {};

  tasks.forEach((task) => {
    const dueDate = new Date(task.dueDate).toDateString();
    if (!tasksByDueDate[dueDate]) {
      tasksByDueDate[dueDate] = [];
    }
    tasksByDueDate[dueDate].push(task);
  });

  return tasksByDueDate;
}

loadTasks();
