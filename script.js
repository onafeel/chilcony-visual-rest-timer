const slides = [...document.querySelectorAll('.slide')];
const nav = document.querySelector('.slide-nav');
const count = document.querySelector('.slide-count span');
let current = 0;

const show = index => {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
  [...nav.children].forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  count.textContent = String(current + 1).padStart(2, '0');
};

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.ariaLabel = `背景画像 ${i + 1}`;
  dot.addEventListener('click', () => show(i));
  nav.append(dot);
});

show(0);
setInterval(() => show(current + 1), 8000);

document.querySelectorAll('[data-preview]').forEach(button => {
  button.addEventListener('click', () => document.querySelector('.hero').classList.toggle('is-preview'));
});
