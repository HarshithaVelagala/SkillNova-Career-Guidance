document.addEventListener("DOMContentLoaded", function () {



  /* ========== QUIZ LOGIC (QUIZ PAGE) ========== */
  const nextBtn = document.querySelector(".next-btn");

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      const math = document.querySelector('input[name="math"]:checked');
      const biology = document.querySelector('input[name="biology"]:checked');

      if (!math || !biology) {
        alert("Please answer all questions");
        return;
      }

      localStorage.setItem("mathInterest", math.value);
      localStorage.setItem("biologyInterest", biology.value);

      window.location.href = "result.html";
    });
  }

});


document.addEventListener("DOMContentLoaded", function () {

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginBtn = document.getElementById("loginBtn");

  const regEmail = document.getElementById("regEmail");
  const regPassword = document.getElementById("regPassword");
  const authRegisterBtn = document.getElementById("authRegisterBtn");

  /* REGISTER TAB CLICK */
  if (registerTab) {
    registerTab.addEventListener("click", function () {
      loginTab.classList.remove("active");
      registerTab.classList.add("active");

      loginEmail.style.display = "none";
      loginPassword.style.display = "none";
      loginBtn.style.display = "none";

      regEmail.style.display = "block";
      regPassword.style.display = "block";
      authRegisterBtn.style.display = "block";
    });
  }

  /* LOGIN TAB CLICK */
  if (loginTab) {
    loginTab.addEventListener("click", function () {
      registerTab.classList.remove("active");
      loginTab.classList.add("active");

      loginEmail.style.display = "block";
      loginPassword.style.display = "block";
      loginBtn.style.display = "block";

      regEmail.style.display = "none";
      regPassword.style.display = "none";
      authRegisterBtn.style.display = "none";
    });
  }

});







/* ========== PARALLAX BACKGROUND (lightweight, respects reduced-motion) ========== */
document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const bg = document.querySelector('.image-bg');
  if (!bg) return;

  bg.style.willChange = 'transform';

  let latestY = 0;
  let ticking = false;

  function onScroll() {
    latestY = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    // parallax factor (smaller = slower movement)
    const factor = 0.18;
    const maxOffset = 220; // cap translation so edges don't show
    const offset = Math.min(latestY * factor, maxOffset);
    bg.style.transform = `translate3d(0, ${offset}px, 0)`;
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // initial position
  update();
});


const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // 🔥 animate once only
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach(el => observer.observe(el));



const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-middle a");

function setActiveLink() {
  let scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 120;
    const sectionId = section.getAttribute("id");

    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", setActiveLink);



const items = document.querySelectorAll('.course-item');

items.forEach(item => {
  item.addEventListener('click', () => {
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});



const modules = document.querySelectorAll('.module');

modules.forEach(module => {
  module.addEventListener('click', () => {
    modules.forEach(m => m.classList.remove('active'));
    module.classList.add('active');
  });
});
