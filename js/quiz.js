const form = document.getElementById("quizForm");
const progress = document.getElementById("progress");
const selects = document.querySelectorAll("select");

selects.forEach((select, index) => {
  select.addEventListener("change", () => {
    let answered = 0;
    selects.forEach(s => {
      if (s.value !== "") answered++;
    });
    progress.style.width = (answered / selects.length) * 100 + "%";
  });
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let total = 0;
  selects.forEach(s => {
    total += parseInt(s.value);
  });

  if (total >= 20) {
    alert("🎯 Your top match: Engineering / AI Career Path!");
  } else if (total >= 15) {
    alert("🎨 Your top match: Creative & Media Career Path!");
  } else {
    alert("💼 Your top match: Business & Management Career Path!");
  }
});
