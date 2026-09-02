const slides = [...document.querySelectorAll('.slide')];
const nav = document.querySelector('.slide-nav');
const count = document.querySelector('.slide-count span');
let current = 0;

const show = index => {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    const active = i === current;
    slide.classList.toggle('is-active', active);
    if (slide.tagName === 'VIDEO') active ? (slide.currentTime = 0, slide.play().catch(() => {})) : slide.pause();
  });
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
setInterval(() => show(current + 1), 7000);

document.querySelectorAll('[data-preview]').forEach(button => {
  button.addEventListener('click', () => document.querySelector('.hero').classList.toggle('is-preview'));
});

const bgm = document.querySelector('#bgm');
const soundButton = document.querySelector('.sound-button');
const soundLabel = document.querySelector('.sound-label');
soundButton.addEventListener('click', () => {
  const on = bgm.muted;
  bgm.muted = !on;
  soundButton.ariaPressed = String(on);
  soundLabel.textContent = `SOUND ${on ? 'ON' : 'OFF'}`;
  if (on) bgm.play().catch(() => soundButton.click()); else bgm.pause();
});
