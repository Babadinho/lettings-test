const storedUserName = localStorage.getItem('userName');
if (!storedUserName) {
  window.location.href = 'index.html';
}
