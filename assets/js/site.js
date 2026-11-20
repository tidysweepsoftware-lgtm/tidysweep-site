// The screenshot carousel, the picture viewer and the phone menu.
(function () {
  const car = document.querySelector('.carousel');
  if (car) {
    const slides = [...car.querySelectorAll('.slide')];
    let i = 0, timer = null;
    // How far a picture must move to be fully off the screen: half the screen plus half the picture, plus room for its shadow.
    const off = (dir) => `translateX(${dir * Math.ceil((window.innerWidth + car.offsetWidth) / 2 + 80)}px)`;
    // The new picture flies in from beyond the right edge of the screen and stops in the middle;
    // the old one flies out past the left edge. dir -1 (the ‹ button) runs the same move the other way.
    const go = (k, dir = 1) => {
      const next = (k + slides.length) % slides.length;
      if (next === i) return;
      const old = slides[i], nw = slides[next];
      nw.style.transition = 'none';
      nw.style.transform = off(dir);
      void nw.offsetWidth; // place it off the screen before it starts moving
      nw.style.transition = '';
      nw.style.transform = 'translateX(0)';
      old.style.transform = off(-dir);
      old.classList.remove('on'); nw.classList.add('on');
      for (const s of [old, nw]) { s.classList.remove('moving'); void s.offsetWidth; s.classList.add('moving'); setTimeout(() => s.classList.remove('moving'), 1150); }
      i = next;
    };
    const restart = () => { clearInterval(timer); timer = setInterval(() => go(i + 1, 1), 5000); };
    car.querySelector('.prev').onclick = () => { go(i - 1, -1); restart(); };
    car.querySelector('.next').onclick = () => { go(i + 1, 1); restart(); };
    car.addEventListener('mouseenter', () => clearInterval(timer));
    car.addEventListener('mouseleave', restart);
    slides.forEach((s, n) => { s.style.transform = n === 0 ? 'translateX(0)' : off(1); s.classList.toggle('on', n === 0); });
    restart();
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
