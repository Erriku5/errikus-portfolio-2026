document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Seamless ticker: duplicate content once ---------- */
  const track = document.getElementById('tickerTrack');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* ---------- Mobile nav toggle ---------- */
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.classList.toggle('is-active', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main > section[id]');
  const navAnchors = document.querySelectorAll('[data-nav]');
  const setActive = () => {
    let current = sections[0]?.id;
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Skill bars fill on visibility ---------- */
  const skillBars = document.querySelectorAll('.skill__bar span');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-filled');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---------- Contact form (static site: opens the visitor's email client) ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('cfNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const company = document.getElementById('cf-company').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      if (!name || !email || !message) {
        note.textContent = 'Merci de remplir au minimum votre nom, votre email et un message.';
        return;
      }

      const subject = encodeURIComponent(`Mission freelance — ${name}`);
      const body = encodeURIComponent(
        `Nom : ${name}\nEmail : ${email}\nEntreprise : ${company || '—'}\n\nMessage :\n${message}`
      );
      window.location.href = `mailto:Erictolotra0@gmail.com?subject=${subject}&body=${body}`;
      note.textContent = 'Votre client email va s\'ouvrir avec le message pré-rempli.';
      form.reset();
    });
  }

});
