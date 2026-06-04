// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal, .reveal-delay, .title-line');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ===== HIDE/SHOW TOPBAR ON SCROLL =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 80) header.classList.add('scrolled');
  else header.classList.remove('scrolled');

  if (current > lastScroll && current > 300) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }
  lastScroll = current;
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((s) => sectionObserver.observe(s));

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
navToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// ===== SERVICES CAROUSEL =====
const talksCarousel = document.getElementById('talksCarousel');
const prevTalk = document.getElementById('prevTalk');
const nextTalk = document.getElementById('nextTalk');

if (talksCarousel) {
  let talkIndex = 0;

  function getVisibleTalks() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  const allTalks = talksCarousel.querySelectorAll('.talk-slide');
  const totalTalks = allTalks.length;

  function updateCarousel() {
    const visible = getVisibleTalks();
    const maxIndex = totalTalks - visible;
    talkIndex = Math.max(0, Math.min(talkIndex, maxIndex));

    const colWidth = talksCarousel.querySelector('.talk-slide')?.offsetWidth || 0;
    const gap = 16;
    talksCarousel.style.transform = `translateX(-${talkIndex * (colWidth + gap)}px)`;
    talksCarousel.style.transition = 'transform 0.45s cubic-bezier(0.4,0,0.2,1)';

    prevTalk.disabled = talkIndex === 0;
    nextTalk.disabled = talkIndex >= maxIndex;
  }

  prevTalk?.addEventListener('click', () => {
    talkIndex--;
    updateCarousel();
  });
  nextTalk?.addEventListener('click', () => {
    talkIndex++;
    updateCarousel();
  });
  window.addEventListener('resize', () => {
    talkIndex = 0;
    updateCarousel();
  });
  updateCarousel();
}

// ===== GALLERY SLIDESHOW =====
const slides = document.querySelectorAll('.galeria-carousel .slide');
if (slides.length > 0) {
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 3500);
}

// ===== FEEDBACK CAROUSEL =====
const feedbackCarousel = document.getElementById('feedbackCarousel');
const prevFeedback = document.getElementById('prevFeedback');
const nextFeedback = document.getElementById('nextFeedback');

if (feedbackCarousel) {
  let feedbackIndex = 0;

  function getVisibleFeedbacks() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  const allFeedbacks = feedbackCarousel.querySelectorAll('.feedback-card');
  const totalFeedbacks = allFeedbacks.length;

  function updateFeedback() {
    const visible = getVisibleFeedbacks();
    const maxIndex = totalFeedbacks - visible;
    feedbackIndex = Math.max(0, Math.min(feedbackIndex, maxIndex));

    const cardWidth = allFeedbacks[0]?.offsetWidth || 0;
    const gap = 20;
    feedbackCarousel.style.transform = `translateX(-${feedbackIndex * (cardWidth + gap)}px)`;

    prevFeedback.disabled = feedbackIndex === 0;
    nextFeedback.disabled = feedbackIndex >= maxIndex;
  }

  prevFeedback?.addEventListener('click', () => {
    feedbackIndex--;
    updateFeedback();
  });
  nextFeedback?.addEventListener('click', () => {
    feedbackIndex++;
    updateFeedback();
  });
  window.addEventListener('resize', () => {
    feedbackIndex = 0;
    updateFeedback();
  });
  updateFeedback();
}

// ===== HERO TITLE FADE-IN =====
window.addEventListener('load', () => {
  const spans = document.querySelectorAll('.title-desktop span');
  spans.forEach((span, i) => {
    setTimeout(
      () => {
        span.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      },
      200 + i * 200
    );
  });
});

// Set initial state for hero title spans
document.querySelectorAll('.title-desktop span').forEach((span) => {
  span.style.opacity = '0';
  span.style.transform = 'translateY(15px)';
  span.style.display = 'inline';
});
