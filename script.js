/* ============================================================
   PORTFOLIO JAVASCRIPT
   Author: [YOUR NAME]
   Description: Complete JS for Personal Portfolio Website
   ============================================================ */

'use strict';

/* ===================== DOM READY ===================== */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initTypingEffect();
  initScrollReveal();
  initActiveNavLinks();
  initBackToTop();
  initContactForm();
  setCurrentYear();
  initParticles();
  initThemeToggle();
  initProjectFilters();
});

/* ===================== NAVBAR ===================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  const toggleScrolled = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggleScrolled, { passive: true });
  toggleScrolled(); // Run on load
}

/* ===================== HAMBURGER MENU ===================== */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const navLinkItems = navLinks.querySelectorAll('.nav-link');

  const closeMenu = () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close when a nav link is clicked
  navLinkItems.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ===================== TYPING EFFECT ===================== */
function initTypingEffect() {
  const typedEl = document.getElementById('typedText');
  if (!typedEl) return;

  const phrases = [
    'B.Tech Information Technology Student',
    'Web Developer',
    'Java Programmer',
    'Open Source Enthusiast',
    'Problem Solver',
  ];

  let phraseIndex  = 0;
  let charIndex    = 0;
  let isDeleting   = false;
  let typingSpeed  = 70;
  let deletingSpeed = 40;
  let pauseTime    = 2000;

  const type = () => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, pauseTime);
        return;
      }
    } else {
      typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
  };

  setTimeout(type, 600);
}

/* ===================== SCROLL REVEAL ===================== */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings in the same parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const index    = siblings.indexOf(entry.target);
        const delay    = Math.min(index * 80, 300);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealEls.forEach(el => observer.observe(el));
}

/* ===================== ACTIVE NAV LINKS ===================== */
function initActiveNavLinks() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;

  const setActive = () => {
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 50;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
}

/* ===================== BACK TO TOP ===================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggle = () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggle, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===================== SET CURRENT YEAR ===================== */
function setCurrentYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ===================== CONTACT FORM VALIDATION ===================== */
function initContactForm() {
  const form         = document.getElementById('contactForm');
  if (!form) return;

  const nameInput    = document.getElementById('contactName');
  const emailInput   = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const msgInput     = document.getElementById('contactMessage');
  const submitBtn    = document.getElementById('submitBtn');
  const formStatus   = document.getElementById('formStatus');

  const nameErr    = document.getElementById('nameError');
  const emailErr   = document.getElementById('emailError');
  const subjectErr = document.getElementById('subjectError');
  const msgErr     = document.getElementById('messageError');

  // ---- Validators ----
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const clearError = (input, errEl) => {
    input.classList.remove('error');
    errEl.textContent = '';
  };

  const showError = (input, errEl, message) => {
    input.classList.add('error');
    errEl.textContent = message;
    return false;
  };

  const validateName = () => {
    const val = nameInput.value.trim();
    if (!val) return showError(nameInput, nameErr, 'Please enter your full name.');
    if (val.length < 2) return showError(nameInput, nameErr, 'Name must be at least 2 characters.');
    clearError(nameInput, nameErr);
    return true;
  };

  const validateEmail = () => {
    const val = emailInput.value.trim();
    if (!val) return showError(emailInput, emailErr, 'Please enter your email address.');
    if (!isValidEmail(val)) return showError(emailInput, emailErr, 'Please enter a valid email address.');
    clearError(emailInput, emailErr);
    return true;
  };

  const validateSubject = () => {
    const val = subjectInput.value.trim();
    if (!val) return showError(subjectInput, subjectErr, 'Please enter a subject.');
    if (val.length < 3) return showError(subjectInput, subjectErr, 'Subject must be at least 3 characters.');
    clearError(subjectInput, subjectErr);
    return true;
  };

  const validateMessage = () => {
    const val = msgInput.value.trim();
    if (!val) return showError(msgInput, msgErr, 'Please enter your message.');
    if (val.length < 10) return showError(msgInput, msgErr, 'Message must be at least 10 characters.');
    clearError(msgInput, msgErr);
    return true;
  };

  // Live validation on blur
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  subjectInput.addEventListener('blur', validateSubject);
  msgInput.addEventListener('blur', validateMessage);

  // Clear error on input
  [nameInput, emailInput, subjectInput, msgInput].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
    });
  });

  // ---- Form Submit ----
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid    = validateName();
    const isEmailValid   = validateEmail();
    const isSubjectValid = validateSubject();
    const isMsgValid     = validateMessage();

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMsgValid) {
      // Focus the first invalid input
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Prepare data to send
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: msgInput.value.trim()
    };

    // Send email using FormSubmit AJAX API
    fetch("https://formsubmit.co/ajax/sathyaviji2008@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <i class="fas fa-check-circle"></i>
          Thank you for reaching out, ${formData.name}! Your message has been sent successfully.
        `;
        form.reset();
        [nameInput, emailInput, subjectInput, msgInput].forEach(i => i.classList.remove('error'));
        [nameErr, emailErr, subjectErr, msgErr].forEach(e => (e.textContent = ''));
      } else {
        throw new Error('Submission failed');
      }
    })
    .catch(error => {
      formStatus.className = 'form-status error';
      formStatus.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        Oops! Something went wrong while sending your message. Please try again later.
      `;
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

      // Hide status after 6 seconds
      setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.innerHTML = '';
      }, 6000);
    });
  });
}

/* ===================== HERO PARTICLES ===================== */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const PARTICLE_COUNT = 35;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: ${Math.random() > 0.5 ? 'rgba(108,99,255,0.6)' : 'rgba(0,212,255,0.5)'};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * -10}s;
      pointer-events: none;
    `;
    container.appendChild(particle);
  }

  // Inject particle animation keyframe
  if (!document.getElementById('particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
        25%       { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * -40 - 10}px) scale(1.2); opacity: 0.8; }
        50%       { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * -60 - 20}px) scale(0.8); opacity: 0.6; }
        75%       { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * -30 - 5}px) scale(1.1); opacity: 0.9; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ===================== SMOOTH SCROLL (FALLBACK) ===================== */
// Most modern browsers support CSS scroll-behavior: smooth.
// This polyfill handles anchor clicks for older browsers.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
    ) || 70;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navH;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

/* ===================== THEME TOGGLE ===================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const body = document.body;
  const leetcodeStat = document.getElementById('leetcodeStat');
  const githubStat = document.getElementById('githubStat');
  if(!toggleBtn) return;

  // Check local storage for theme
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    updateStatThemes('light');
  } else {
    updateStatThemes('dark');
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    updateStatThemes(isLight ? 'light' : 'dark');
  });

  function updateStatThemes(theme) {
    if(leetcodeStat) {
      leetcodeStat.src = `https://leetcard.jacoblin.cool/iUq2lrQgSF?theme=${theme === 'light' ? 'light' : 'dark'}&font=Outfit&ext=heatmap`;
    }
    if(githubStat) {
      githubStat.src = `https://github-readme-stats.vercel.app/api?username=sathiyanarayanan-2008&show_icons=true&theme=${theme === 'light' ? 'default' : 'tokyonight'}`;
    }
  }
}

/* ===================== PROJECT FILTERING ===================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if(!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          card.classList.remove('hide');
          // Reset animation by triggering reflow
          card.style.animation = 'none';
          card.offsetHeight; 
          card.style.animation = null; 
        } else {
          card.classList.add('hide');
        }
      });
      
      // Re-trigger reveal animation for newly shown cards
      setTimeout(() => {
        ScrollReveal();
      }, 50);
    });
  });
  
  function ScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal:not(.hide)');
    revealEls.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 50) {
        el.classList.add('visible');
      }
    });
  }
}
