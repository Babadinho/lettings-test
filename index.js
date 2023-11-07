document.getElementById('nameForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const userName = document.getElementById('userName').value;
  localStorage.setItem('userName', userName);
  window.location.href = 'tasker.html';
});

const storedUserName = localStorage.getItem('userName');
if (storedUserName) {
  window.location.href = 'tasker.html';
}
