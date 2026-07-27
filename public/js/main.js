/**
 * Manoj Kumar - Developer Portfolio
 * Interactivity, Theme Toggling, Custom Scroll Reveals, and Project Filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Management
  initTheme();
  
  // Header scrolled state & active link updates
  initHeader();

  // Mobile Menu
  initMobileMenu();

  // Scroll Reveal Animations
  initScrollReveal();

  // Animated Counter Statistics
  initCounters();

  // Project Filtering
  initProjectFilters();

  // Skills Filtering
  initSkillsFilters();

  // GitHub Profile Showcase Fetcher
  initGitHubShowcase();

  // Contact Form Logic
  initContactForm();

  // Interactive Particle Background Animation
  initParticleBackground();

  // Scroll Progress Bar
  initScrollProgress();

  // Custom Cursor follower
  initCustomCursor();

  // Subtitle Typing Carousel
  initTypingCarousel();
});

/* ==========================================
   1. Theme Management (Dark by Default)
   ========================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply initial theme
  document.documentElement.setAttribute('data-theme', storedTheme);
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Update DOM
      document.documentElement.setAttribute('data-theme', newTheme);
      // Save setting
      localStorage.setItem('theme', newTheme);
      
      // Play brief icon rotation animation
      const icon = themeToggleBtn.querySelector('i');
      if (icon) {
        icon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
          icon.style.transform = '';
        }, 500);
      }
    });
  }
}

/* ==========================================
   2. Header Scroll & Active Section Linker
   ========================================== */
function initHeader() {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // 1. Toggle glass background on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 2. Active Link tracking on scroll
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================
   3. Mobile Menu Toggle
   ========================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinksContainer.classList.toggle('mobile-active');
      const isOpen = navLinksContainer.classList.contains('mobile-active');
      mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinksContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinksContainer.classList.remove('mobile-active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }
}

/* ==========================================
   4. Scroll Reveal Animations (IntersectionObserver)
   ========================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .scale-in');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, we don't need to track it anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/* ==========================================
   5. Animated Counter Statistics
   ========================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('.stat-num');
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetEl = entry.target;
        const targetVal = parseFloat(targetEl.getAttribute('data-target'));
        const hasPlus = targetEl.getAttribute('data-plus') === 'true';
        const decimals = targetEl.getAttribute('data-decimals') === '1' ? 1 : 0;
        
        animateCount(targetEl, targetVal, hasPlus, decimals);
        observer.unobserve(targetEl);
      }
    });
  }, {
    threshold: 0.5
  });

  counterElements.forEach(el => {
    counterObserver.observe(el);
  });
}

function animateCount(element, target, hasPlus, decimals) {
  let startTimestamp = null;
  const duration = 2000; // 2 seconds
  
  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    // Easing function - easeOutQuad
    const easeProgress = progress * (2 - progress);
    const currentValue = easeProgress * target;
    
    if (decimals === 1) {
      element.innerHTML = currentValue.toFixed(1) + (hasPlus ? '+' : '');
    } else {
      element.innerHTML = Math.floor(currentValue) + (hasPlus ? '+' : '');
    }
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.innerHTML = target.toFixed(decimals) + (hasPlus ? '+' : '');
    }
  }
  
  window.requestAnimationFrame(step);
}

/* ==========================================
   6. Project Categories Filter
   ========================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.projects-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Setup fade transition
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });
}

/* ==========================================
   7. Skills Categories Filter
   ========================================== */
function initSkillsFilters() {
  const filterBtns = document.querySelectorAll('.skills-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  // Trigger progress bars to animate when section enters viewport
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = document.querySelectorAll('.skill-progress-bar');
          progressBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level;
          });
        }
      });
    }, { threshold: 0.1 });
    barObserver.observe(skillsSection);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-category');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });
}

/* ==========================================
   8. Dynamic GitHub Showcase Fetcher
   ========================================== */
function initGitHubShowcase() {
  const username = 'leomaxvj';
  const url = `https://api.github.com/users/${username}`;
  
  // Backup static data if GitHub rate limit is hit or network fails
  const fallbackProfile = {
    name: "Manoj Kumar",
    bio: "React Native & React.js Developer | building high-performance cross-platform apps",
    public_repos: 18,
    followers: 12,
    following: 15
  };

  const profileCard = document.getElementById('github-profile');
  if (!profileCard) return;

  // Attempt API call
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Network error or rate limit');
      return response.json();
    })
    .then(data => {
      renderGitHubProfile(data);
    })
    .catch(() => {
      // Use fallback
      renderGitHubProfile(fallbackProfile);
    });
}

function renderGitHubProfile(profile) {
  const avatar = document.getElementById('gh-avatar');
  const name = document.getElementById('gh-name');
  const bio = document.getElementById('gh-bio');
  const reposVal = document.getElementById('gh-repos-val');
  const followersVal = document.getElementById('gh-followers-val');
  const followingVal = document.getElementById('gh-following-val');

  if (avatar) avatar.src = profile.avatar_url || 'images/man2.JPG';
  if (name) name.innerHTML = profile.name || 'Manoj Kumar';
  if (bio) bio.innerHTML = profile.bio || 'React Native & React.js Developer with 3.5+ years of experience.';
  if (reposVal) reposVal.innerHTML = profile.public_repos;
  if (followersVal) followersVal.innerHTML = profile.followers || '15+';
  if (followingVal) followingVal.innerHTML = profile.following || '20+';
}

/* ==========================================
   9. Contact Form Validator & Submit simulation
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedbackEl = document.getElementById('form-feedback');

  if (form && feedbackEl) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      const subject = form.querySelector('input[name="subject"]').value.trim();
      const message = form.querySelector('textarea[name="message"]').value.trim();
      
      // Clear previous styles
      feedbackEl.style.display = 'none';
      feedbackEl.className = 'form-feedback';
      
      // Simple validation
      if (!name || !email || !message) {
        showFeedback('Please fill in all required fields (Name, Email, Message).', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate API submit
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showFeedback('Thank you, Manoj! Your message has been sent successfully. I will get back to you shortly.', 'success');
        form.reset();
      }, 1500);
    });
  }

  function showFeedback(msg, type) {
    feedbackEl.innerHTML = msg;
    feedbackEl.classList.add(type === 'success' ? 'feedback-success' : 'feedback-error');
    feedbackEl.style.display = 'block';
    
    // Auto-scroll slightly to show feedback on mobile
    feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

/* ==========================================
   10. Interactive Particle Background
   ========================================== */
function initParticleBackground() {
  const canvas = document.getElementById('bg-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;
  let time = 0;
  let isMobile = false;

  // Mouse coordinates & settings
  let mouse = {
    x: null,
    y: null,
    radius: 180, // Cursor constellation web line limit
    repelRadius: 125 // Magnetic repulsion push range
  };

  // Detect mobile/tablet/touch environments
  function checkDevice() {
    isMobile = window.innerWidth < 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  }

  // Adjust canvas size & adjust density
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    checkDevice();
    initParticles();
  }

  // Particle Node Class
  class NodeParticle {
    constructor() {
      this.reset();
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.baseSpeed = Math.random() * 0.4 + 0.2; // Smooth and subtle speed
      this.speed = this.baseSpeed;
      
      // Multi-layer trigonometric motion phase offsets
      this.phaseX = Math.random() * Math.PI * 2;
      this.phaseY = Math.random() * Math.PI * 2;
      this.phaseSpeed = Math.random() * 0.005 + 0.002;
      
      this.size = Math.random() * 1.5 + 1.0; // Node size
      this.life = Math.random() * 300 + 300; // Particle cycle age limit
      this.age = 0;
      
      this.setupColor();
    }

    setupColor() {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      if (theme === 'dark') {
        this.color = Math.random() > 0.5 
          ? 'rgba(6, 182, 212, ' + (Math.random() * 0.3 + 0.2) + ')' // Cyan glow
          : 'rgba(139, 92, 246, ' + (Math.random() * 0.3 + 0.2) + ')'; // Purple glow
        this.dotColor = Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6';
      } else {
        this.color = Math.random() > 0.5 
          ? 'rgba(8, 145, 178, ' + (Math.random() * 0.2 + 0.1) + ')' // Cyan
          : 'rgba(124, 58, 237, ' + (Math.random() * 0.2 + 0.1) + ')'; // Purple
        this.dotColor = Math.random() > 0.5 ? '#0891b2' : '#7c3aed';
      }
    }

    update() {
      this.age++;
      if (this.age >= this.life) {
        this.reset();
      }

      // Smooth wave movement using trigonometry
      this.phaseX += this.phaseSpeed;
      this.phaseY += this.phaseSpeed;

      // Base vector drift
      let driftX = Math.sin(this.phaseX + time * 0.001) * this.speed;
      let driftY = Math.cos(this.phaseY + time * 0.001) * this.speed;

      // Mouse repulsion (only on desktop and when mouse position is set)
      if (!isMobile && mouse.x !== null && mouse.y !== null) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.repelRadius) {
          // Repel force: strongest near the cursor, goes to 0 at repelRadius
          let force = (mouse.repelRadius - dist) / mouse.repelRadius;
          
          // Eased repulsion vector
          let forceDirectionX = dx / dist;
          let forceDirectionY = dy / dist;
          
          // Apply repulsion (acceleration toward outer bounds)
          driftX += forceDirectionX * force * 2.5;
          driftY += forceDirectionY * force * 2.5;
        }
      }

      this.x += driftX;
      this.y += driftY;

      // Wrap around bounds with safety margin
      const margin = 20;
      if (this.x < -margin) this.x = canvas.width + margin;
      if (this.x > canvas.width + margin) this.x = -margin;
      if (this.y < -margin) this.y = canvas.height + margin;
      if (this.y > canvas.height + margin) this.y = -margin;
    }

    draw() {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.dotColor;
      ctx.globalAlpha = theme === 'dark' ? 0.45 : 0.35;
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
  }

  function initParticles() {
    particles = [];
    // Calculate density based on viewport dimensions
    let densityRatio = (canvas.width * canvas.height) / 9000;
    // Set bounds on count (e.g. 50-70 on mobile, 75-150 on desktop)
    let count = Math.floor(densityRatio);
    let minCount = isMobile ? 35 : 75;
    let maxCount = isMobile ? 70 : 150;
    count = Math.min(Math.max(count, minCount), maxCount);

    for (let i = 0; i < count; i++) {
      particles.push(new NodeParticle());
    }
  }

  // Draw background connected lines (plexus net)
  function drawConnections() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const maxDistance = 115;
    const len = particles.length;

    // Connect particles together
    for (let i = 0; i < len; i++) {
      const p1 = particles[i];
      
      // Calculate connection to mouse
      if (!isMobile && mouse.x !== null && mouse.y !== null) {
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
          // Linear transparency mapping
          const alpha = (1 - dist / mouse.radius) * 0.18;
          ctx.strokeStyle = theme === 'dark' 
            ? 'rgba(6, 182, 212, ' + alpha + ')' // Cyan connection in dark mode
            : 'rgba(8, 145, 178, ' + alpha + ')'; // Cyan-dark connection in light mode
          ctx.lineWidth = (1 - dist / mouse.radius) * 0.9 + 0.3;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Connect particles to other particles
      for (let j = i + 1; j < len; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * (theme === 'dark' ? 0.12 : 0.08);
          ctx.strokeStyle = theme === 'dark'
            ? 'rgba(139, 92, 246, ' + alpha + ')' // Purple connection in dark mode
            : 'rgba(124, 58, 237, ' + alpha + ')'; // Purple-dark connection in light mode
          ctx.lineWidth = (1 - dist / maxDistance) * 0.6 + 0.2;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  // Soft Radial Torch Light centered around the mouse cursor
  function drawFlashlight() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (!isMobile && mouse.x !== null && mouse.y !== null) {
      ctx.beginPath();
      const glowRadius = 240;
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
      
      if (theme === 'dark') {
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.08)'); // Purple core
        gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)'); // Cyan outer
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(124, 58, 237, 0.05)'); // Soft lavender core
        gradient.addColorStop(0.6, 'rgba(8, 145, 178, 0.01)'); // Very faint cyan
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Animation Loop
  function animate() {
    time++;
    
    // Clear canvas completely to keep lines sharp and clean
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the flashlight glow first (below the dots and grid lines)
    drawFlashlight();

    // Draw connections (glowing web grid)
    drawConnections();

    // Update and draw nodes
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', resizeCanvas);
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Dynamic color updating when theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
        particles.forEach(p => p.setupColor());
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true });

  // Init & Run
  resizeCanvas();
  animate();
}

/* ==========================================
   11. Scroll Progress Bar
   ========================================== */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) {
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    } else {
      progressBar.style.width = '0%';
    }
  });
}

/* ==========================================
   12. Custom Mouse Follower Cursor
   ========================================== */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (!cursor || !cursorDot) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let hasMoved = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!hasMoved) {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
      hasMoved = true;
    }
  });

  function render() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';

    requestAnimationFrame(render);
  }
  render();

  const hoverElements = document.querySelectorAll('a, button, .skills-tab-btn, .project-card, .github-repo-card, .linkedin-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
    hasMoved = false;
  });
}

/* ==========================================
   13. Dynamic Hero Typing Cycle Carousel
   ========================================== */
function initTypingCarousel() {
  const textElement = document.getElementById('typed-text');
  if (!textElement) return;

  const roles = [
    "React Native & React.js Developer",
    "Mobile & Web App Architect",
    "Enterprise Frontend Engineer",
    "Swift & iOS App Specialist"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeCycle() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      textElement.innerHTML = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      textElement.innerHTML = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(typeCycle, typingSpeed);
  }

  setTimeout(typeCycle, 1000);
}
