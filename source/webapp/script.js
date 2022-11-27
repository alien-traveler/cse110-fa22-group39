window.addEventListener('DOMContentLoaded', init);

/**
 * read data of coffee shops and add events for buttons on home page
 */
async function init(){
    try {
        await getShops();
    } catch (error) {
        console.log(error);
    }


    let createButtonEl = document.querySelectorAll("button")[0];
    // add click event to the button for create new recipes
    createButtonEl.addEventListener('click', () => {
        window.location = "./preset-customize/choice.html";
    })
    let saveButtonEl = document.querySelectorAll("button")[1];
    //add click event to the button for view the saved recipes
    saveButtonEl.addEventListener('click', () => {
        window.location = "./savedRecipes/savedRecipes.html"
    })
    
}

/**
 * Get the data of coffee shops from the file shops.json
 * @returns {array} the data of coffee shops as JSON object in an array
 */
async function getShops() {
    // Fetch the recipes from localStorage
    let shops = localStorage.getItem('shops');
    if(shops) return JSON.parse(shops);
    // if localStorage does not have data of shops
    return new Promise(async (resolve, reject) => {
        try {
            //read the file
            shops = await fetch("./shops.json");
            shops = await shops.json();
            localStorage.setItem('shops', JSON.stringify(shops));
            resolve(shops);
        } catch (error) {
            console.error(error);
            reject(error);
          }
      });
}