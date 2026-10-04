/* ============================================================
   THE DIGITAL UNIVERSE OF SATHIYA – JAVASCRIPT ENGINE
   Author: Sathiya Narayanan V S
   Features:
     - Three.js Interactive 3D Hero Environment
     - SATHYA AI Portfolio Assistant with Local Knowledge Base
     - Live GitHub Repositories Integration (sathiyanarayanan-2008)
     - Interactive Developer Terminal with Command Execution
     - Project Details Modal System
     - Futuristic Custom Cursor & Scroll Progress Indicator
     - 3D Card Tilt Micro-Interactions
     - Form Validation, Theme Toggle, Smooth Scroll & Filter
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initCustomCursor();
  initNavbar();
  initHamburger();
  initThemeToggle();
  initTypingEffect();
  initThreeHero();
  initScrollReveal();
  initActiveNavLinks();
  initBackToTop();
  initCodeCopy();
  initCard3DTilt();
  initProjectFilters();
  initProjectModal();
  initDeveloperTerminal();
  initGitHubActivity();
  initSathyaAI();
  initContactForm();
  setCurrentYear();
});

/* ===================== SCROLL PROGRESS BAR ===================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

/* ===================== CUSTOM FUTURISTIC CURSOR ===================== */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const follower = document.getElementById('cursorFollower');
  if (!dot || !follower) return;

  // Don't initialize on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  const renderFollower = () => {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(renderFollower);
  };
  requestAnimationFrame(renderFollower);

  // Hover state expansions
  const interactives = document.querySelectorAll('a, button, input, textarea, .tilt-card, .terminal-chip');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
  });
}

/* ===================== NAVBAR ===================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggleScrolled = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggleScrolled, { passive: true });
  toggleScrolled();
}

/* ===================== HAMBURGER DRAWER ===================== */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

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

  navLinkItems.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

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
    'Aspiring Software Developer',
    'Web Developer',
    'AI Enthusiast',
    'Java & Python Programmer'
  ];

  let phraseIndex   = 0;
  let charIndex     = 0;
  let isDeleting    = false;
  let typingSpeed   = 70;
  let deletingSpeed = 35;
  let pauseTime     = 2200;

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

  setTimeout(type, 500);
}

/* ===================== THREE.JS 3D HERO ENVIRONMENT ===================== */
function initThreeHero() {
  const canvas = document.getElementById('hero3dCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const container = canvas.parentElement;
  let width = container.clientWidth || 450;
  let height = container.clientHeight || 450;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 24;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const blueLight = new THREE.PointLight(0x386BFF, 2.5, 50);
  blueLight.position.set(10, 10, 15);
  scene.add(blueLight);

  const purpleLight = new THREE.PointLight(0x8554FF, 2.2, 50);
  purpleLight.position.set(-10, -8, 12);
  scene.add(purpleLight);

  const cyanLight = new THREE.PointLight(0x00D9FF, 2.0, 40);
  cyanLight.position.set(0, 12, -10);
  scene.add(cyanLight);

  // Group for the entire 3D Developer Sphere Universe
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // Central Core Sphere (Futuristic Wireframe + Glowing Icosahedron)
  const sphereGeo = new THREE.IcosahedronGeometry(5.2, 2);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0x0C1535,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
    roughness: 0.2,
    metalness: 0.8
  });
  const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
  mainGroup.add(coreSphere);

  // Inner Glowing Nucleus
  const nucleusGeo = new THREE.SphereGeometry(3.2, 32, 32);
  const nucleusMat = new THREE.MeshPhongMaterial({
    color: 0x386BFF,
    emissive: 0x1A2A6C,
    transparent: true,
    opacity: 0.45,
    shininess: 90
  });
  const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
  mainGroup.add(nucleusMesh);

  // Animated Orbital Rings (Torus)
  const createOrbitalRing = (radius, tube, color, rotX, rotY) => {
    const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.75
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = rotX;
    ring.rotation.y = rotY;
    return ring;
  };

  const ring1 = createOrbitalRing(7.2, 0.045, 0x00D9FF, Math.PI / 3, Math.PI / 6);
  const ring2 = createOrbitalRing(8.3, 0.04, 0x8554FF, -Math.PI / 4, Math.PI / 4);
  const ring3 = createOrbitalRing(9.4, 0.035, 0x386BFF, Math.PI / 2.2, -Math.PI / 5);
  mainGroup.add(ring1);
  mainGroup.add(ring2);
  mainGroup.add(ring3);

  // Surrounding Particle Field
  const particleCount = window.innerWidth < 768 ? 120 : 260;
  const particlesGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  const palette = [
    new THREE.Color(0x386BFF),
    new THREE.Color(0x8554FF),
    new THREE.Color(0x00D9FF)
  ];

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = 10 + Math.random() * 12;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i3 + 2] = radius * Math.cos(phi);

    const chosenColor = palette[Math.floor(Math.random() * palette.length)];
    particleColors[i3] = chosenColor.r;
    particleColors[i3 + 1] = chosenColor.g;
    particleColors[i3 + 2] = chosenColor.b;
  }

  particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 0.16,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });
  const particleSystem = new THREE.Points(particlesGeo, particlesMat);
  mainGroup.add(particleSystem);

  // Mouse Parallax
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;

  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotationY = normX * 0.55;
    targetRotationX = -normY * 0.55;
  }, { passive: true });

  // Handle Resize
  const onResize = () => {
    width = container.clientWidth || 450;
    height = container.clientHeight || 450;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  window.addEventListener('resize', onResize);

  // Pause rendering when hero is not visible
  let isHeroVisible = true;
  const heroObserver = new IntersectionObserver((entries) => {
    isHeroVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 });
  heroObserver.observe(canvas);

  // Animation Loop
  let clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);

    if (!isHeroVisible) return;

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      // Rotation
      coreSphere.rotation.y += 0.005;
      coreSphere.rotation.x += 0.002;

      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.007;
      ring3.rotation.z += 0.006;

      particleSystem.rotation.y += 0.0015;

      // Gentle floating pulse
      nucleusMesh.scale.setScalar(1 + Math.sin(elapsedTime * 2) * 0.05);

      // Smooth mouse follow interpolation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      mainGroup.rotation.x = currentRotationX;
      mainGroup.rotation.y = currentRotationY;
    }

    renderer.render(scene, camera);
  };

  animate();
}

/* ===================== SCROLL REVEAL ===================== */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
}

/* ===================== ACTIVE NAV LINKS ===================== */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navHeight = 80;

  const setActive = () => {
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 60;
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

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===================== SET CURRENT YEAR ===================== */
function setCurrentYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ===================== COPY CODE SNIPPET ===================== */
function initCodeCopy() {
  const copyBtn = document.getElementById('copyCodeBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const codeSnippet = `const developer = {
  name: "Sathiya Narayanan V S",
  degree: "B.Tech Information Technology",
  college: "Easwari Engineering College",
  year: "Second Year (2025 – 2029)",
  cgpa: "8.9",
  location: "Chennai, India",
  interests: ["Software Development", "Java & Python", "Web Development", "Artificial Intelligence", "Prompt Engineering"],
  status: "Building impactful software",
  openToCollaborate: true
};`;

    navigator.clipboard.writeText(codeSnippet).then(() => {
      copyBtn.innerHTML = '<i class="fas fa-check" style="color: #00F5A0;"></i>';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
      }, 2000);
    }).catch(() => {
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => { copyBtn.innerHTML = '<i class="fas fa-copy"></i>'; }, 2000);
    });
  });
}

/* ===================== 3D CARD TILT MICRO-INTERACTIONS ===================== */
function initCard3DTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltCards = document.querySelectorAll('.tilt-card, .about-code-window');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ===================== PROJECT FILTERING ===================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-bento-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/* ===================== PROJECT DETAILS MODAL ===================== */
const PROJECT_DETAILS = {
  railoptiai: {
    title: 'RailOptiAI – Dynamic Rail Block Optimizer',
    tech: ['Python', 'Google OR-Tools', 'Constraint Programming', 'Optimization', 'Algorithms'],
    overview: 'RailOptiAI is an intelligent railway scheduling and block allocation engine that models track section constraints, dynamic train delays, and platform resource allocation.',
    features: [
      'Constraint Programming Solver built using Google OR-Tools CP-SAT.',
      'Dynamic block replanning responding to unexpected track speed restrictions.',
      'Conflict detection ensuring strict headway and safety spacing between trains.',
      'Automated dispatch schedule generation with minimized delay propagation.'
    ],
    problemSolved: 'Railway networks face cascade delays when one train slows down. RailOptiAI dynamically computes alternative dispatch paths in milliseconds, preventing bottleneck gridlocks.',
    github: 'https://github.com/sathiyanarayanan-2008'
  },
  smartcampus: {
    title: 'Smart Campus Service Hub',
    tech: ['Java', 'Spring Boot', 'MongoDB', 'JavaScript', 'HTML5/CSS3', 'REST API'],
    overview: 'A centralized collegiate service application providing student grievance routing, digital maintenance dispatch, and campus resource reservation.',
    features: [
      'Secure role-based authentication for students, faculty, and maintenance staff.',
      'RESTful backend architecture built with Java and Spring Boot framework.',
      'Automated status notifications and ticket progression workflows.',
      'Responsive interface ensuring complete usability across student mobile devices.'
    ],
    problemSolved: 'Replaces fragmented paper-based and manual college service desks with a synchronized digital platform, cutting resolution times significantly.',
    github: 'https://github.com/sathiyanarayanan-2008/SmartCampus'
  },
  financetracker: {
    title: 'Personal Finance Tracker',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage', 'Data Visualization'],
    overview: 'A comprehensive budgeting and expense monitoring web application featuring categorized transaction management, visual spending breakdowns, and CSV data exports.',
    features: [
      'Income vs expense calculation with real-time balance calculations.',
      'Visual categorization breakdown highlighting top expenditure areas.',
      'Local storage persistence enabling instant offline access without remote leaks.',
      'Exportable financial summary reports for monthly budget auditing.'
    ],
    problemSolved: 'Empowers students and professionals to track expenditure easily with a zero-friction, privacy-friendly interface.',
    github: 'https://github.com/sathiyanarayanan-2008'
  },
  wastewise: {
    title: 'Waste Wise AI',
    tech: ['Python', 'Computer Vision', 'AI/ML Heuristics', 'Sustainability'],
    overview: 'An AI-driven waste management system designed to classify recyclable, biodegradable, and hazardous refuse to encourage sustainable urban disposal.',
    features: [
      'Computer vision classification of common waste material categories.',
      'Educational disposal advice guiding users on proper bin allocation.',
      'Eco-savings and sustainability metrics tracking carbon avoidance.',
      'Modular API designed for future IoT smart bin integration.'
    ],
    problemSolved: 'Addresses urban contamination in recycling bins by providing instant, accurate material identification at the point of disposal.',
    github: 'https://github.com/sathiyanarayanan-2008'
  },
  genaichatbot: {
    title: 'Generative AI Chatbot',
    tech: ['Prompt Engineering', 'LLMs', 'JavaScript', 'NLP Context Handling'],
    overview: 'A specialized conversational assistant engineered with multi-turn context retention, structured prompt engineering templates, and intent routing.',
    features: [
      'Multi-turn conversational dialogue management preserving context across topics.',
      'Robust fallback handling and guardrails ensuring reliable domain responses.',
      'Custom prompt chain architectures for task-specific question answering.',
      'Fast client-side lightweight interaction with smooth streaming display.'
    ],
    problemSolved: 'Eliminates repetitive manual Q&A workflows through an intelligent, context-aware chatbot interface.',
    github: 'https://github.com/sathiyanarayanan-2008'
  },
  rivyuu: {
    title: 'Rivyuu Connect',
    tech: ['React', 'Vite', 'Spring Boot', 'Java', 'REST API'],
    overview: 'A trust-oriented review platform engineered to provide verified consumer evaluations and authentic community feedback.',
    features: [
      'Lightning-fast modern frontend compiled with React and Vite.',
      'Decoupled Spring Boot microservice architecture handling reviews and ratings.',
      'Clean search and sorting filters by ratings, verified tags, and timestamps.',
      'Responsive design with optimized asset delivery.'
    ],
    problemSolved: 'Offers a clean, spam-resistant review ecosystem focusing on verified buyer feedback.',
    github: 'https://github.com/sathiyanarayanan-2008/rivyuu-connect'
  },
  bot: {
    title: 'Automation Bot',
    tech: ['JavaScript', 'Node.js', 'Automation', 'Webhooks'],
    overview: 'An automated scripting bot demonstrating event-driven programming, API interactions, and automated background task dispatch.',
    features: [
      'Automated webhook notification triggers based on target events.',
      'Event-driven asynchronous architecture in Node.js.',
      'Error handling and retry loops ensuring continuous uptime.',
      'Configurable task runners for automated data fetches.'
    ],
    problemSolved: 'Automates manual repetitive digital tasks, improving workflow productivity.',
    github: 'https://github.com/sathiyanarayanan-2008/bot'
  }
};

function initProjectModal() {
  const overlay = document.getElementById('projectModalOverlay');
  const closeBtn = document.getElementById('modalCloseBtn');
  const actionCloseBtn = document.getElementById('modalCloseActionBtn');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  const titleEl = document.getElementById('modalTitle');
  const techEl = document.getElementById('modalTechStack');
  const overviewEl = document.getElementById('modalOverview');
  const featuresEl = document.getElementById('modalFeatures');
  const problemEl = document.getElementById('modalProblemSolved');
  const githubLink = document.getElementById('modalGithubLink');

  if (!overlay) return;

  const openModal = (projId) => {
    const data = PROJECT_DETAILS[projId];
    if (!data) return;

    titleEl.textContent = data.title;
    overviewEl.textContent = data.overview;
    problemEl.textContent = data.problemSolved;
    githubLink.href = data.github;

    // Tech tags
    techEl.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = t;
      techEl.appendChild(span);
    });

    // Features
    featuresEl.innerHTML = '';
    data.features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      featuresEl.appendChild(li);
    });

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-modal');
      openModal(projId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (actionCloseBtn) actionCloseBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ===================== INTERACTIVE DEVELOPER TERMINAL ===================== */
function initDeveloperTerminal() {
  const screen = document.getElementById('terminalScreen');
  const input = document.getElementById('terminalInput');
  const chips = document.querySelectorAll('.terminal-chip');
  if (!screen || !input) return;

  const commandHistory = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => `
Available Commands:
  • <span style="color:#00F5A0;">about</span>         - View Sathiya's bio and education
  • <span style="color:#00F5A0;">skills</span>        - List core programming languages and frameworks
  • <span style="color:#00F5A0;">projects</span>      - Explore featured development projects
  • <span style="color:#00F5A0;">education</span>     - Academic journey and college details
  • <span style="color:#00F5A0;">certifications</span>- Verified certifications & industry simulations
  • <span style="color:#00F5A0;">github</span>        - GitHub profile link and activity info
  • <span style="color:#00F5A0;">contact</span>       - Direct communication channels
  • <span style="color:#00F5A0;">resume</span>        - Access online and printable resume
  • <span style="color:#00F5A0;">whoami</span>        - Display current user identity
  • <span style="color:#00F5A0;">clear</span>         - Clear the terminal screen
`,
    about: () => `
[ABOUT SATHIYA NARAYANAN V S]
• Degree: B.Tech Information Technology (Second Year, 2025–2029)
• College: Easwari Engineering College, Chennai
• CGPA: 8.9 / 10.0
• Focus: Software Development, Web Dev, Java, Python & Generative AI
`,
    skills: () => `
[TECHNICAL COMPETENCIES]
• Languages: Java, Python, C, JavaScript (ES6+), HTML5, CSS3
• Frameworks: Spring Boot (Basics), React (Basics), Google OR-Tools
• AI / ML: Generative AI, Prompt Engineering, Data Analytics
• Tools: Git, GitHub, VS Code, Linux CLI
`,
    projects: () => `
[FEATURED PROJECTS]
1. RailOptiAI             - Dynamic train block optimization with Google OR-Tools
2. Smart Campus Hub       - Campus services portal with Java & Spring Boot
3. Personal Finance App   - Expense tracking and spending categorization
4. Waste Wise AI          - AI waste classification concept for sustainability
5. Generative AI Chatbot  - Context-driven dialogue assistant with prompt engineering
6. Rivyuu Connect         - Authentic review sharing app (React + Spring Boot)
`,
    education: () => `
[ACADEMIC BACKGROUND]
1. Easwari Engineering College, Chennai (2025 – 2029)
   B.Tech Information Technology &bull; Second Year &bull; CGPA: 8.9
2. All Angels Matriculation Hr. Sec. School (2023 – 2025)
   Higher Secondary Certificate (12th) &bull; Score: 84.1%
3. All Angels Matriculation Hr. Sec. School (2021 – 2023)
   Secondary School Certificate (10th) &bull; Score: 87.5%
`,
    certifications: () => `
[VERIFIED CERTIFICATIONS & SIMULATIONS]
• AWS Solutions Architecture Job Simulation &bull; AWS &amp; Forage (Jan 2026)
• GenAI Powered Data Analytics Simulation   &bull; TATA &amp; Forage (Jan 2026)
• Introduction to Modern AI                &bull; Cisco Networking Academy (Aug 2024)
`,
    github: () => `
[GITHUB INTEGRATION]
Profile: <a href="https://github.com/sathiyanarayanan-2008" target="_blank" style="color:var(--clr-cyan);text-decoration:underline;">https://github.com/sathiyanarayanan-2008</a>
Check out the "MY DEVELOPER ACTIVITY" section below for live repository metrics.
`,
    contact: () => `
[CONTACT CHANNELS]
• Email: sathyaviji2008@gmail.com
• LinkedIn: https://www.linkedin.com/in/sathiyanarayanan2008
• GitHub: https://github.com/sathiyanarayanan-2008
• LeetCode: https://leetcode.com/u/iUq2lrQgSF/
`,
    resume: () => `
[RESUME]
View online resume or print as PDF:
<a href="resume.html" target="_blank" style="color:var(--clr-cyan);text-decoration:underline;">Click here to open resume.html</a>
`,
    whoami: () => `visitor@portfolio-universe:~$ You are an appreciated explorer of Sathiya's digital universe!`,
    clear: () => '__CLEAR__'
  };

  const executeCommand = (cmdText) => {
    const rawCmd = cmdText.trim();
    if (!rawCmd) return;

    commandHistory.push(rawCmd);
    historyIndex = commandHistory.length;

    // Render command prompt line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line';
    cmdLine.innerHTML = `<span class="terminal-prompt-user">sathiya@developer</span>:<span class="terminal-prompt-path">~</span>$ ${escapeHtml(rawCmd)}`;
    screen.appendChild(cmdLine);

    const lowerCmd = rawCmd.toLowerCase();
    const handler = COMMANDS[lowerCmd];

    if (lowerCmd === 'clear') {
      screen.innerHTML = '';
      return;
    }

    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line';

    if (handler) {
      outputLine.innerHTML = handler();
    } else {
      outputLine.innerHTML = `<span style="color:#FF4D88;">Command not recognized: "${escapeHtml(rawCmd)}". Type <span style="color:#00F5A0;">help</span> to see available commands.</span>`;
    }

    screen.appendChild(outputLine);
    screen.scrollTop = screen.scrollHeight;
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(input.value);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = '';
      }
    }
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
      input.focus();
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ===================== LIVE GITHUB ACTIVITY INTEGRATION ===================== */
async function initGitHubActivity() {
  const container = document.getElementById('githubReposContainer');
  const countLabel = document.getElementById('repoCountLabel');
  if (!container) return;

  const USERNAME = 'sathiyanarayanan-2008';
  const API_URL = `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`;

  // Fallback repos in case GitHub rate limits or user is offline
  const fallbackRepos = [
    {
      name: 'portfolio-website',
      description: 'The Digital Universe of Sathiya – Premium Futuristic 3D Developer Portfolio with Three.js & AI assistant.',
      language: 'JavaScript',
      stargazers_count: 1,
      forks_count: 0,
      html_url: `https://github.com/${USERNAME}/portfolio-website`
    },
    {
      name: 'SmartCampus',
      description: 'A smart campus management web application designed to streamline collegiate operations and student services.',
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
      html_url: `https://github.com/${USERNAME}/SmartCampus`
    },
    {
      name: 'rivyuu-connect',
      description: 'A trust-based review sharing web platform built with React, Vite, and Spring Boot.',
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
      html_url: `https://github.com/${USERNAME}/rivyuu-connect`
    },
    {
      name: 'bot',
      description: 'Automation bot built with JavaScript and Node.js for automated scripting and API notifications.',
      language: 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
      html_url: `https://github.com/${USERNAME}/bot`
    }
  ];

  const renderRepos = (repos) => {
    container.innerHTML = '';
    repos.forEach(repo => {
      const card = document.createElement('article');
      card.className = 'github-repo-card tilt-card reveal visible';
      card.innerHTML = `
        <div>
          <div class="repo-card-top">
            <i class="fas fa-book-bookmark" style="color: var(--clr-primary);"></i>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card-name">${escapeHtml(repo.name)}</a>
          </div>
          <p class="repo-card-desc">${escapeHtml(repo.description || 'Public GitHub repository by Sathiya Narayanan.')}</p>
        </div>
        <div class="repo-card-meta">
          <span class="repo-lang">
            <span class="repo-lang-dot"></span>
            ${escapeHtml(repo.language || 'Code')}
          </span>
          <div class="repo-stats">
            <span><i class="far fa-star"></i> ${repo.stargazers_count || 0}</span>
            <span><i class="fas fa-code-fork"></i> ${repo.forks_count || 0}</span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    if (countLabel) {
      countLabel.innerHTML = `<i class="fab fa-github"></i> ${repos.length} Public Repositories Loaded`;
    }
  };

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('GitHub API response not OK');
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      renderRepos(data);
    } else {
      renderRepos(fallbackRepos);
    }
  } catch (err) {
    // Graceful offline/rate-limit fallback
    renderRepos(fallbackRepos);
  }
}

/* ===================== SATHYA AI FLOATING ASSISTANT ===================== */
function initSathyaAI() {
  const launcher = document.getElementById('aiLauncher');
  const chatWindow = document.getElementById('aiChatWindow');
  const closeBtn = document.getElementById('aiCloseBtn');
  const body = document.getElementById('aiChatBody');
  const input = document.getElementById('aiChatInput');
  const sendBtn = document.getElementById('aiSendBtn');
  const promptChips = document.querySelectorAll('.ai-prompt-chip');

  if (!launcher || !chatWindow) return;

  const toggleChat = () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      input.focus();
    }
  };

  launcher.addEventListener('click', toggleChat);
  if (closeBtn) closeBtn.addEventListener('click', toggleChat);

  // Local Portfolio Knowledge Base Responses
  const KNOWLEDGE_BASE = [
    {
      keywords: ['who', 'sathiya', 'about', 'him', 'introduce', 'name'],
      reply: "Sathiya Narayanan V S is a passionate second-year B.Tech Information Technology student at Easwari Engineering College in Chennai. He is an aspiring software developer with a strong focus on web development, Java, Python, and emerging Generative AI technologies!"
    },
    {
      keywords: ['skill', 'stack', 'languages', 'tech', 'technology', 'technologies', 'know'],
      reply: "Sathiya's technical repertoire includes:\n• Languages: Java, Python, C, JavaScript (ES6+), HTML5, CSS3\n• Frameworks & Tools: Spring Boot, React, Google OR-Tools, Git, GitHub, VS Code\n• Emerging: Generative AI, Prompt Engineering, and Data Analytics."
    },
    {
      keywords: ['railoptiai', 'rail', 'train', 'optimization'],
      reply: "RailOptiAI is Sathiya's railway block allocation and dynamic replanning engine. It uses Google OR-Tools and constraint programming to resolve track conflict bottlenecks and optimize train dispatching during real-world delays."
    },
    {
      keywords: ['project', 'projects', 'built', 'work', 'showcase'],
      reply: "Sathiya has built several impressive projects:\n1. 🚄 RailOptiAI – Dynamic rail scheduling with OR-Tools\n2. 🏫 Smart Campus Service Hub – Java & Spring Boot collegiate portal\n3. 💰 Personal Finance Tracker – Categorized expense management\n4. ♻️ Waste Wise AI – AI-driven waste classification concept\n5. 🤖 Generative AI Chatbot – Context-aware conversational assistant\n6. ⭐ Rivyuu Connect – Review platform (React + Spring Boot)"
    },
    {
      keywords: ['education', 'college', 'cgpa', 'school', 'marks', 'degree', 'study', 'year'],
      reply: "Academic Details:\n• College: Easwari Engineering College, Chennai\n• Degree: B.Tech Information Technology\n• Academic Level: Second Year (2025–2029)\n• CGPA: 8.9 / 10.0\n• 12th Grade: 84.1% (Computer Science & Science stream)\n• 10th Grade: 87.5%"
    },
    {
      keywords: ['certif', 'certificate', 'credentials', 'forage', 'aws', 'cisco', 'tata'],
      reply: "Sathiya holds verified credentials including:\n• AWS Solutions Architecture Job Simulation (Amazon Web Services & Forage, Jan 2026)\n• GenAI Powered Data Analytics Simulation (TATA & Forage, Jan 2026)\n• Introduction to Modern AI (Cisco Networking Academy, Aug 2024)"
    },
    {
      keywords: ['contact', 'email', 'hire', 'reach', 'message', 'touch', 'linkedin', 'github'],
      reply: "You can reach Sathiya directly via:\n• Email: sathyaviji2008@gmail.com\n• LinkedIn: linkedin.com/in/sathiyanarayanan2008\n• GitHub: github.com/sathiyanarayanan-2008\nOr use the Contact form at the bottom of the page!"
    },
    {
      keywords: ['resume', 'cv', 'download', 'pdf'],
      reply: "You can view and print Sathiya's complete resume by clicking 'View Resume' on the hero or navigating to resume.html directly."
    }
  ];

  const getBotResponse = (userQuery) => {
    const q = userQuery.toLowerCase();
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(kw => q.includes(kw))) {
        return item.reply;
      }
    }
    return "I am trained on Sathiya's portfolio! You can ask me about his technical skills, education at Easwari Engineering College, projects like RailOptiAI and Smart Campus Hub, certifications, or how to contact him.";
  };

  const appendMessage = (sender, text) => {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text.replace(/\n/g, '<br/>');
    body.appendChild(bubble);
    body.scrollTop = body.scrollHeight;
  };

  const handleSend = () => {
    const query = input.value.trim();
    if (!query) return;

    appendMessage('user', query);
    input.value = '';

    // Typing effect placeholder
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble bot';
    typingIndicator.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> SATHYA AI is thinking...';
    body.appendChild(typingIndicator);
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const reply = getBotResponse(query);
      appendMessage('bot', reply);
    }, 450);
  };

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      input.value = prompt;
      handleSend();
    });
  });
}

/* ===================== CONTACT FORM VALIDATION ===================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
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

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const clearError = (input, errEl) => {
    input.classList.remove('error');
    if (errEl) errEl.textContent = '';
  };

  const showError = (input, errEl, message) => {
    input.classList.add('error');
    if (errEl) errEl.textContent = message;
    return false;
  };

  const validateName = () => {
    const val = nameInput.value.trim();
    if (!val) return showError(nameInput, nameErr, 'Please enter your name.');
    clearError(nameInput, nameErr);
    return true;
  };

  const validateEmail = () => {
    const val = emailInput.value.trim();
    if (!val) return showError(emailInput, emailErr, 'Please enter your email.');
    if (!isValidEmail(val)) return showError(emailInput, emailErr, 'Please enter a valid email address.');
    clearError(emailInput, emailErr);
    return true;
  };

  const validateSubject = () => {
    const val = subjectInput.value.trim();
    if (!val) return showError(subjectInput, subjectErr, 'Please enter a subject.');
    clearError(subjectInput, subjectErr);
    return true;
  };

  const validateMessage = () => {
    const val = msgInput.value.trim();
    if (!val) return showError(msgInput, msgErr, 'Please write your message.');
    if (val.length < 8) return showError(msgInput, msgErr, 'Message must be at least 8 characters.');
    clearError(msgInput, msgErr);
    return true;
  };

  [nameInput, emailInput, subjectInput, msgInput].forEach(i => {
    i.addEventListener('input', () => i.classList.remove('error'));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isV1 = validateName();
    const isV2 = validateEmail();
    const isV3 = validateSubject();
    const isV4 = validateMessage();

    if (!isV1 || !isV2 || !isV3 || !isV4) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';

    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: msgInput.value.trim()
    };

    fetch("https://formsubmit.co/ajax/sathyaviji2008@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      formStatus.className = 'form-status success';
      formStatus.innerHTML = `<i class="fas fa-check-circle"></i> Thank you, ${formData.name}! Your message has been transmitted successfully.`;
      form.reset();
    })
    .catch(() => {
      // Graceful mailto fallback
      formStatus.className = 'form-status success';
      formStatus.innerHTML = `<i class="fas fa-info-circle"></i> Direct transmission opened. You can also email directly to <a href="mailto:sathyaviji2008@gmail.com" style="color:var(--clr-cyan);text-decoration:underline;">sathyaviji2008@gmail.com</a>.`;
      window.location.href = `mailto:sathyaviji2008@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Transmitted Message';
      setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.innerHTML = '';
      }, 7000);
    });
  });
}

/* ===================== THEME TOGGLE ===================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const body = document.body;
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  });
}
