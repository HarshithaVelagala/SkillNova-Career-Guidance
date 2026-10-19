document.addEventListener("DOMContentLoaded", function(){

  const name = localStorage.getItem("userEmail");
  if(name){
    document.getElementById("studentName").innerText = name;
  }

  const math = localStorage.getItem("mathInterest");
  const bio = localStorage.getItem("biologyInterest");

  let recommendation = "Explore all clubs to discover your interest!";

  if(math === "high"){
    recommendation = "AI, Coding & Engineering Club";
  }
  else if(bio === "high"){
    recommendation = "Earth, Agriculture & Sustainability Club";
  }

  document.getElementById("recommendationText").innerText = recommendation;

  // Fake Progress
  let progress = 0;

  if(localStorage.getItem("bioModuleCompleted") === "true"){
    progress += 50;
  }

  if(localStorage.getItem("waterModuleCompleted") === "true"){
    progress += 50;
  }

  document.getElementById("progressFill").style.width = progress + "%";
  document.getElementById("progressText").innerText = progress + "% Completed";

});

function goToClub(){
  const math = localStorage.getItem("mathInterest");

  if(math === "high"){
    window.location.href = "engineering.html";
  }else{
    window.location.href = "agriculture.html";
  }
}