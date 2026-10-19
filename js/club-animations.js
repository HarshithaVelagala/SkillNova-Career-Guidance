// Counter animation for highlight numbers
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 30;
  
  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// Animate all counter elements when they become visible
document.addEventListener('DOMContentLoaded', function() {
  const highlightNumbers = document.querySelectorAll('.highlight-number[data-target]');
  
  // Create intersection observer for animations on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  highlightNumbers.forEach(element => {
    observer.observe(element);
  });
  
  // Add smooth scroll behavior to all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add stagger animation to module cards on page load
  const modules = document.querySelectorAll('.module');
  modules.forEach((module, index) => {
    module.style.animationDelay = `${index * 0.1}s`;
  });
});

// Handle navigation back button
document.addEventListener('DOMContentLoaded', function() {
  const backBtns = document.querySelectorAll('.back-btn');
  backBtns.forEach(btn => {
    if (btn.textContent.includes('←')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.history.back();
      });
    }
  });
});
