// The screenshot carousel, the picture viewer and the phone menu.
(function () {
  const car = document.querySelector('.carousel');
  if (car) {
    const slides = [...car.querySelectorAll('.slide')];
    const dots = car.querySelector('.dots');
    let i = 0, timer = null;
    slides.forEach((_, k) => { const b = document.createElement('button'); b.setAttribute('aria-label', `Show picture ${k + 1}`); b.onclick = () => { go(k); restart(); }; dots.appendChild(b); });
    const go = (k) => {
      i = (k + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('on', n === i));
      [...dots.children].forEach((d, n) => d.classList.toggle('on', n === i));
    };
    const restart = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 4500); };
    car.querySelector('.prev').onclick = () => { go(i - 1); restart(); };
    car.querySelector('.next').onclick = () => { go(i + 1); restart(); };
    car.addEventListener('mouseenter', () => clearInterval(timer));
    car.addEventListener('mouseleave', restart);
    go(0); restart();
  }
  // Click any screenshot on an app page to see it big.
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<img alt="">';
  box.onclick = () => box.classList.remove('on');
  document.body.appendChild(box);
  document.querySelectorAll('[data-zoom]').forEach((el) => {
    el.addEventListener('click', () => { box.querySelector('img').src = el.dataset.zoom; box.classList.add('on'); });
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') box.classList.remove('on'); });
  const menu = document.querySelector('.menu-btn');
  if (menu) menu.onclick = () => document.querySelector('.nav-links').classList.toggle('open');
})();
