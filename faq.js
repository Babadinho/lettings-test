const faqItem = document.querySelectorAll('.faq__item');

faqItem.forEach((faq, i) => {
  faq.addEventListener('click', () => {
    faq.classList.toggle('faq__item--active');
  });
});
