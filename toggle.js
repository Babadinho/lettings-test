window.onload = function () {
  if (localStorage.darkMode == 'true') {
    document.body.classList.toggle('dark-mode');
    document.getElementById('checkbox').checked = true;
  } else {
    document.body.classList.toggle('body');
  }
};
document.getElementById('checkbox').addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.darkMode = localStorage.darkMode == 'true' ? 'false' : 'true';
});
