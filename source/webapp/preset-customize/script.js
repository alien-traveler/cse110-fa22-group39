window.addEventListener("DOMContentLoaded", init);
window.onload = function () {
  this.loadHome();
};

/**
 * add two buttons and one for choosing preset recipes and one for
 * customizing coffee recipes, and it helps to clean the existed data
 * of coffee recipes if users want to customize recipes directly
 */
function init() {
  let leftButtonEl = document.querySelectorAll("button")[0];
  //add click event for choosing preset recipes
  leftButtonEl.addEventListener("click", () => {
    window.location = "../preset-list/preset-recipies.html";
  });
  let rightButtonEl = document.querySelectorAll("button")[1];
  //add click event for customizing coffee recipes
  rightButtonEl.addEventListener("click", () => {
    const index = localStorage.getItem("index");
    if (index) {
      // clean the existed data if users want to customize directly
      localStorage.removeItem("index");
    }
    const savedIndex = localStorage.getItem("savedIndex");
    if (savedIndex) {
      // clean the existed data if users want to customize directly
      localStorage.removeItem("savedIndex");
    }
    localStorage.setItem("Condition", "Create");
    window.location = "../CustomizeRecipe/customize.html";
  });
}
