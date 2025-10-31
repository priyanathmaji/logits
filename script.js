// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a small animation to the button
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
  });
}

// Animate stats on homepage
function animateStats() {
  const stats = {
    projectCount: 15,
    yearsExp: 3,
    techStack: 20
  };

  Object.keys(stats).forEach(key => {
    const element = document.getElementById(key);
    if (element) {
      let current = 0;
      const target = stats[key];
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current);
        }
      }, 30);
    }
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all slide-up elements
document.addEventListener('DOMContentLoaded', () => {
  const slideUpElements = document.querySelectorAll('.slide-up');
  slideUpElements.forEach(el => {
    observer.observe(el);
  });
});

// Handle contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formMessage = document.getElementById('formMessage');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate form submission
    setTimeout(() => {
      formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
      formMessage.className = 'form-message success';
      
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }, 1000);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Initialize animations when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateStats);
} else {
  animateStats();
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-content');
  if (hero) {
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - scrolled / 700;
  }
});
