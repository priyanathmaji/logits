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
  // Check if using FormSubmit or custom handling
  const isFormSubmit = contactForm.getAttribute('action')?.includes('formsubmit.co');
  
  if (!isFormSubmit) {
    // Custom form handling (for demo/testing)
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
  } else {
    // FormSubmit handling - check for success parameter
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const formMessage = document.getElementById('formMessage');
    
    if (success === 'true' && formMessage) {
      formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
      formMessage.className = 'form-message success';
      formMessage.style.display = 'block';
      
      // Clear URL parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
}

// mailto fallback function
function sendEmail() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  
  window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
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

// Reading Progress Bar
function updateReadingProgress() {
  const article = document.querySelector('.blog-post');
  if (!article) return;

  let progressBar = document.querySelector('.reading-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.prepend(progressBar);
  }

  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.pageYOffset;
  const progress = (scrolled / documentHeight) * 100;

  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

if (document.querySelector('.blog-post')) {
  window.addEventListener('scroll', updateReadingProgress);
  updateReadingProgress();
}

// Copy Code to Clipboard
function initCodeCopyButtons() {
  const codeBlocks = document.querySelectorAll('.post-content pre');
  
  codeBlocks.forEach((block) => {
    // Wrap in container if not already wrapped
    if (!block.parentElement.classList.contains('code-block-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      block.parentNode.insertBefore(wrapper, block);
      wrapper.appendChild(block);
    }

    const wrapper = block.parentElement;
    
    // Add copy button
    const button = document.createElement('button');
    button.className = 'copy-code-btn';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    
    button.addEventListener('click', async () => {
      const code = block.querySelector('code').textContent;
      
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        button.textContent = 'Failed';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }
    });
    
    wrapper.insertBefore(button, block);
  });
}

// Initialize code copy buttons on page load
if (document.querySelector('.post-content')) {
  document.addEventListener('DOMContentLoaded', initCodeCopyButtons);
}

// Table of Contents Generation and Active Highlighting
function generateTableOfContents() {
  const postContent = document.querySelector('.post-content');
  if (!postContent) return;

  const headings = postContent.querySelectorAll('h2, h3');
  if (headings.length < 3) return; // Don't generate TOC for short posts

  const toc = document.createElement('div');
  toc.className = 'table-of-contents';
  toc.innerHTML = '<h2>On This Page</h2><ul></ul>';
  
  const tocList = toc.querySelector('ul');
  let currentLevel = 2;
  let currentList = tocList;
  const lists = { 2: tocList };

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.substring(1));
    const text = heading.textContent;
    const id = heading.id || `heading-${index}`;
    
    if (!heading.id) {
      heading.id = id;
    }

    // Create nested lists for h3
    if (level > currentLevel) {
      const newList = document.createElement('ul');
      if (currentList.lastElementChild) {
        currentList.lastElementChild.appendChild(newList);
      }
      currentList = newList;
      lists[level] = newList;
    } else if (level < currentLevel) {
      currentList = lists[level];
    }

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.textContent = text;
    li.appendChild(a);
    currentList.appendChild(li);

    currentLevel = level;
  });

  // Append TOC to body (as fixed sidebar)
  document.body.appendChild(toc);

  // Highlight active section on scroll
  const tocLinks = toc.querySelectorAll('a');
  const observerOptions = {
    rootMargin: '-100px 0px -66%',
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        tocLinks.forEach(link => link.classList.remove('active'));
        const activeLink = toc.querySelector(`a[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  headings.forEach(heading => observer.observe(heading));
}

// Initialize TOC on page load
if (document.querySelector('.post-content')) {
  document.addEventListener('DOMContentLoaded', generateTableOfContents);
}

// Footnotes Enhancement (convert markdown-style footnotes to proper HTML)
function enhanceFootnotes() {
  const postContent = document.querySelector('.post-content');
  if (!postContent) return;

  // This works with markdown parsers that generate footnote sections
  const footnoteSection = postContent.querySelector('.footnotes');
  if (footnoteSection && !footnoteSection.querySelector('h2')) {
    const heading = document.createElement('h2');
    heading.textContent = 'Footnotes';
    footnoteSection.insertBefore(heading, footnoteSection.firstChild);
  }
}

// Initialize footnotes on page load
if (document.querySelector('.post-content')) {
  document.addEventListener('DOMContentLoaded', enhanceFootnotes);
}

// Image Lightbox for Blog Posts
function initImageLightbox() {
  const images = document.querySelectorAll('.post-content img, .image-gallery img');
  if (images.length === 0) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
    <img src="" alt="">
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  images.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// Initialize lightbox on page load
if (document.querySelector('.post-content')) {
  document.addEventListener('DOMContentLoaded', initImageLightbox);
}

// Syntax Highlighting with Highlight.js (if loaded)
function initSyntaxHighlighting() {
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }
}

// Initialize syntax highlighting on page load
if (document.querySelector('.post-content')) {
  document.addEventListener('DOMContentLoaded', initSyntaxHighlighting);
}

