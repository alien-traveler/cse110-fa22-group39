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
        window.location = "../CustomizeRecipe/customize.html";
    })
}