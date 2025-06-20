const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const body = document.querySelector('body');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');
  });
}

function updateActiveNavigation() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function setupAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animElements = document.querySelectorAll('.animate');
  animElements.forEach(el => observer.observe(el));
}

function initializeProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    if (window.innerWidth > 768) {
      card.addEventListener('mouseenter', () => card.classList.add('hover'));
      card.addEventListener('mouseleave', () => card.classList.remove('hover'));
    }
  });
}

function initializeMemberCards() {
  const memberCards = document.querySelectorAll('.member-card');

  memberCards.forEach(card => {
    if (window.innerWidth > 768) {
      card.addEventListener('mouseenter', () => card.classList.add('hover'));
      card.addEventListener('mouseleave', () => card.classList.remove('hover'));
    }
  });
}

function initCodeTypingEffect() {
  const codeBlocks = document.querySelectorAll('.hero-code code');
  codeBlocks.forEach(block => block.classList.add('typing-effect'));
}
document.addEventListener('click', (e) => {
  if (navMenu && navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    body.classList.remove('no-scroll');
  }
});

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      body.classList.remove('no-scroll');
    }
  });
});

async function loadGitHubAvatars() {
  const memberCards = document.querySelectorAll('.member-card[data-github]');

  for (const card of memberCards) {
    const username = card.dataset.github;
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      if (data.avatar_url) {
        const img = card.querySelector('.member-photo');
        img.src = data.avatar_url;

        const githubLink = card.querySelector('.github-icon');
        if (githubLink) {
          githubLink.href = `https://github.com/${username}`;
        }
      }
    } catch (error) {
      console.error(`Error loading avatar for ${username}:`, error);
    }
  }
}

function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');

  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 130) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateActiveNavigation();
  initializeProjectCards();
  initializeMemberCards();
  initCodeTypingEffect();
  setupAnimations();
  loadGitHubAvatars();
  initBackToTop();
});
