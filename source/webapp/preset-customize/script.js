window.addEventListener('DOMContentLoaded', init);
window.onload = function(){
    this.loadHome();
}
function init(){
    let leftButtonEl = document.querySelectorAll("button")[0];
    leftButtonEl.addEventListener('click', () => {
        window.location = "../preset-list/preset-recipies.html";
    })
    let rightButtonEl = document.querySelectorAll("button")[1];
    rightButtonEl.addEventListener('click', () => {
        localStorage.removeItem('index');   // Remove index and mode keys for
        localStorage.removeItem('mode');    // recipes from scratch
        window.location = "../CustomizeRecipe/customize.html";
    })
}
