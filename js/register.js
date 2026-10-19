document.addEventListener("DOMContentLoaded", function () {

  /* ===== LOGIN MODAL ===== */
  const openLogin = document.getElementById("openLoginNav");
  const loginModal = document.getElementById("loginModal");
  const closeLogin = document.getElementById("closeLogin");

  if (openLogin && loginModal && closeLogin) {
    openLogin.addEventListener("click", () => {
      loginModal.classList.add("active");
    });

    closeLogin.addEventListener("click", () => {
      loginModal.classList.remove("active");
    });
  }

  /* ===== REGISTER BUTTONS ===== */
  const registerBtns = document.querySelectorAll("#registerBtn");
  registerBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (loginModal) loginModal.classList.add("active");
      const registerTab = document.getElementById("registerTab");
      if (registerTab) registerTab.click();
    });
  });
 
  /* ===== TAB SWITCHING ===== */
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginBtn = document.getElementById("loginBtn");

  const regName = document.getElementById("regName");
  const regEmail = document.getElementById("regEmail");
  const regPassword = document.getElementById("regPassword");
  const authRegisterBtn = document.getElementById("authRegisterBtn");

  if (loginTab && registerTab) {

    registerTab.addEventListener("click", () => {
      loginTab.classList.remove("active");
      registerTab.classList.add("active");

      loginEmail.style.display = "none";
      loginPassword.style.display = "none";
      loginBtn.style.display = "none";
      regName.style.display = "block";
      regEmail.style.display = "block";
      regPassword.style.display = "block";
      authRegisterBtn.style.display = "block";
    });

    loginTab.addEventListener("click", () => {
      registerTab.classList.remove("active");
      loginTab.classList.add("active");

      loginEmail.style.display = "block";
      loginPassword.style.display = "block";
      loginBtn.style.display = "block";

      regName.style.display = "none";
      regEmail.style.display = "none";
      regPassword.style.display = "none";
      authRegisterBtn.style.display = "none";
    });
  }

  /* ===== REGISTER ===== */
  if (authRegisterBtn) {
    authRegisterBtn.addEventListener("click", () => {
      const name = regName.value.trim();
      const email = regEmail.value.trim();
      const password = regPassword.value.trim();

      if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
      }

      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);

      alert("Registration successful. Please login.");
      loginTab.click();
    });
  }

  /* ===== LOGIN ===== */
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = loginEmail.value.trim();
      const password = loginPassword.value.trim();

      const savedEmail = localStorage.getItem("userEmail");
      const savedPassword = localStorage.getItem("userPassword");
      const savedName = localStorage.getItem("userName");

      if (!email || !password) {
        alert("Please enter email and password");
        return;
      }

      if (email === savedEmail && password === savedPassword) {
        sessionStorage.setItem("loggedInUser", email);
        if (savedName) sessionStorage.setItem("loggedInName", savedName);
        alert("Login successful");
        window.location.href = "dashboard.html";
      } else if (!savedEmail || !savedPassword) {
        alert("No registered user found. Please register first.");
      } else {
        alert("Invalid credentials");
      }
    });
  }

});