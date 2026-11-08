
// Elements used in several places
const root = document.documentElement;
const progressBar = document.getElementById('progress-bar');
const backToTop = document.getElementById('back-to-top');
const navLinks = document.getElementById('nav-links');
const navAnchors = navLinks.querySelectorAll('a[href^="#"]');
const resumeModal = document.getElementById('resume-modal');

// Scroll progress, active nav link and back-to-top button
function onScroll() {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (window.scrollY / maxScroll) * 100 + '%';
  backToTop.classList.toggle('show', window.scrollY > 600);

  navAnchors.forEach(link => {
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    const section = document.querySelector(id);
    const top = section.offsetTop - 140;
    link.classList.toggle('active', window.scrollY >= top && window.scrollY < top + section.offsetHeight);
  });
}
window.addEventListener('scroll', onScroll);

backToTop.addEventListener('click', () => window.scrollTo({ top: 0 }));

// Typing effect in the hero heading
const phrases = ['end to end', 'with React & Node', 'that ships', 'and sweats details'];
const typedText = document.getElementById('typed-text');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const phrase = phrases[phraseIndex];
  charIndex += deleting ? -1 : 1;
  typedText.textContent = phrase.slice(0, charIndex);

  let delay = deleting ? 40 : 85;
  if (!deleting && charIndex === phrase.length) {
    deleting = true;
    delay = 1600;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 300;
  }
  setTimeout(type, delay);
}
type();

// Skills ticker (list is repeated so the loop looks continuous)
const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js',
  'MERN Stack', 'REST APIs', 'Tailwind CSS', 'MongoDB', 'MySQL', 'SQL Queries', 'Python',
  'Git', 'GitHub Actions', 'Vercel', 'Render'];
const tickerHtml = skills.map(name => `<span>${name}</span><i>•</i>`).join('');
document.getElementById('ticker-track').innerHTML = tickerHtml + tickerHtml;

// Count-up numbers
function countUp(el) {
  const target = Number(el.dataset.count);
  const decimals = target % 1 ? 1 : 0;
  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = (target * progress).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Reveal elements as they scroll into view, one after another
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    entry.target.querySelectorAll('[data-count]').forEach(countUp);
    if (entry.target.dataset.count) countUp(entry.target);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
  const position = Array.prototype.indexOf.call(el.parentElement.children, el);
  el.style.transitionDelay = (position % 6) * 90 + 'ms';
  observer.observe(el);
});

// Theme toggle: start dark and keep the available theme explicit.
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const isDark = root.dataset.theme === 'dark';
  root.dataset.theme = isDark ? 'light' : 'dark';
  themeToggle.textContent = isDark ? 'Dark' : 'Light';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to dark theme' : 'Switch to light theme');
  themeToggle.title = isDark ? 'Switch to dark theme' : 'Switch to light theme';
});

// Mobile menu
document.getElementById('menu-toggle').addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') navLinks.classList.remove('open');
});

// Resume viewer
function openResume(e) {
  if (e) e.preventDefault();
  resumeModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  navLinks.classList.remove('open');
}


function closeResume() {
  resumeModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('close-resume').addEventListener('click', closeResume);
resumeModal.addEventListener('click', e => {
  if (e.target === resumeModal) closeResume();
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeResume();
});
