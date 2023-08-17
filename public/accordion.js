// public/accordion.js
function toggleAccordion(event) {
  const accordionContent = event.target.nextElementSibling;
  accordionContent.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  accordionButtons.forEach((button) => {
    button.addEventListener('click', toggleAccordion);
  });
});
