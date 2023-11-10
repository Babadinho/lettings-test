const hero_image = document.querySelector('.hero__image');
const checkbox = document.getElementById('checkbox');

function updateHeroImage(isDarkMode) {
  hero_image.innerHTML = `<img src="/images/tasker${
    isDarkMode ? '1' : ''
  }.jpg" alt="Hero Image">`;
}

const isDarkMode = localStorage.getItem('darkMode') === 'true';
updateHeroImage(isDarkMode);

checkbox.addEventListener('change', function () {
  const isDarkMode = checkbox.checked;
  updateHeroImage(isDarkMode);
});

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
