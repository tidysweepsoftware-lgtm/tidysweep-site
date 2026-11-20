// The screenshot carousel, the picture viewer and the phone menu.
(function () {
  const car = document.querySelector('.carousel');
  if (car) {
    const slides = [...car.querySelectorAll('.slide')];
    const dots = car.querySelector('.dots');
    let i = 0, timer = null;
    slides.forEach((_, k) => { const b = document.createElement('button'); b.setAttribute('aria-label', `Show picture ${k + 1}`); b.onclick = () => { go(k, k > i ? 1 : -1); restart(); }; dots.appendChild(b); });
    // The new picture slides in from the right and stops in the middle; the old one slides out to the left.
    // dir -1 (the ‹ button) runs the same move the other way.
    const go = (k, dir = 1) => {
      const next = (k + slides.length) % slides.length;
      if (next === i) return;
      const old = slides[i], nw = slides[next];
      nw.style.transition = 'none';
      nw.style.transform = `translateX(${dir * 100}%)`;
      void nw.offsetWidth; // place it off to the side before it starts moving
      nw.style.transition = '';
      nw.style.transform = 'translateX(0)';
      old.style.transform = `translateX(${-dir * 100}%)`;
      old.classList.remove('on'); nw.classList.add('on');
      for (const s of [old, nw]) { s.classList.remove('moving'); void s.offsetWidth; s.classList.add('moving'); setTimeout(() => s.classList.remove('moving'), 900); }
      i = next;
      [...dots.children].forEach((d, n) => d.classList.toggle('on', n === i));
    };
    const restart = () => { clearInterval(timer); timer = setInterval(() => go(i + 1, 1), 5000); };
    car.querySelector('.prev').onclick = () => { go(i - 1, -1); restart(); };
    car.querySelector('.next').onclick = () => { go(i + 1, 1); restart(); };
    car.addEventListener('mouseenter', () => clearInterval(timer));
    car.addEventListener('mouseleave', restart);
    slides.forEach((s, n) => { s.style.transform = n === 0 ? 'translateX(0)' : 'translateX(100%)'; s.classList.toggle('on', n === 0); });
    dots.children[0].classList.add('on');
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
