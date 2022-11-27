window.addEventListener("DOMContentLoaded", init);

function init() {
  let ContiButtonEl = document.querySelectorAll("button")[0];
  ContiButtonEl.addEventListener("click", () => {
    window.location = "../reviewRecipe/review.html";
  });
}
