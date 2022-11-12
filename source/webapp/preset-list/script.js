window.addEventListener('DOMContentLoaded', init);
window.onload = function(){
    this.loadHome();
}

function init(){
    let firstButtonEl = document.querySelectorAll("button")[0];
    firstButtonEl.addEventListener('click', () => {
        window.location = "../editThePreset/editThePreset.html";
    })
    let secondButtonEl = document.querySelectorAll("button")[1];
    secondButtonEl.addEventListener('click', () => {
        window.location = "../editThePreset/editThePreset.html";
    })
    let thirdButtonEl = document.querySelectorAll("button")[2];
    thirdButtonEl.addEventListener('click', () => {
        window.location = "../editThePreset/editThePreset.html";
    })
}