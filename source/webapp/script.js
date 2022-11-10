window.addEventListener('DOMContentLoaded', init);

function init(){
    let createButtonEl = document.querySelectorAll("button")[0];
    createButtonEl.addEventListener('click', () => {
        window.location = "./preset-customize/choice.html";
    })
    let saveButtonEl = document.querySelectorAll("button")[1];
    saveButtonEl.addEventListener('click', () => {
        
    })
}