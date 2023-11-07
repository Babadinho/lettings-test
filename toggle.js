// light mode and save to local storage
window.onload = function () {
  if (localStorage.lightMode == 'true') {
    document.body.classList.toggle('dark-mode');
    document.getElementById('checkbox').checked = true;
  } else {
    document.body.classList.toggle('body');
  }
};
document.getElementById('checkbox').addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.lightMode = localStorage.lightMode == 'true' ? 'false' : 'true';
});
