const logoutButton = document.querySelector('.logout');

const storedUserName = localStorage.getItem('userName');
if (!storedUserName) {
  window.location.href = 'index.html';
}

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('userName');
  window.location.href = 'index.html';
});
