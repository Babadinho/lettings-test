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
  storedTasks.forEach((task) => {
    createTaskElement(task.text, new Date(task.dueDate));
  });
}

// function to save task
function saveTasks() {
  const taskElements = tasksList.querySelectorAll('li');
  const tasks = Array.from(taskElements).map((taskElement) => ({
    text: taskElement.textContent,
    dueDate: taskElement.dataset.dueDate,
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// function to create task
function createTaskElement(taskText) {
  const taskItem = document.createElement('li');
  const taskTextParagraph = document.createElement('p');
  taskTextParagraph.textContent = taskText;
  taskItem.appendChild(taskTextParagraph);

  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const matchingTask = storedTasks.find((task) => task.text === taskText);
  if (matchingTask) {
    const dueDate = new Date(matchingTask.dueDate);
    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = `${dueDate.toDateString()}`;
    taskItem.appendChild(dueDateSpan);
  }

  tasksList.appendChild(taskItem);
}

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

addTaskButtonModal.addEventListener('click', () => {
  const taskText = taskInputModal.value;
  const dueDate = taskDueDateInput._flatpickr.selectedDates[0];

  if (taskText.trim() !== '' && dueDate) {
    createTaskElement(taskText, dueDate);
    taskInputModal.value = '';
    taskDueDateInput._flatpickr.clear();
    taskModal.style.display = 'none';
    saveTasks();
  } else {
    alert('Please enter a task and select a due date.');
  }
});

flatpickr(taskDueDateInput, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  altFormat: 'F j, Y',
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
