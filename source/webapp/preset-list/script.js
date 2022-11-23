window.addEventListener('DOMContentLoaded', init);

/**
 * read data of recipes and add events for buttons on preset-recipies.html
 */
async function init(){
    let recipes;

    try {
        recipes = await getRecipes();
    } catch (error) {
        console.log(error);
    }

    addRecipesToDocument(recipes)
}

/**
 * Get the data of preset coffee recipes from the file presets.json
 * @returns {array} the data of coffee shops as JSON object in an array 
 */
async function getRecipes() {
    // Fetch the recipes from localStorage
    let recipes = localStorage.getItem('recipes');
    if(recipes) return JSON.parse(recipes);
    
    return new Promise(async (resolve, reject) => {
        try {
            recipes = await fetch("../presets.json");
            recipes = await recipes.json();
            saveRecipes(recipes);
            resolve(recipes);
        } catch (error) {
            console.error(error);
            reject(error);
          }
      });
}

/**
 * store the data of a array of recipes into localStorage
 * @param {array} recipes an array of coffee recipes
 */
function saveRecipes(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * add rows to the table on this preset-recipies.html page for each recipes
 * @param {array} recipes an array of coffee recipes needed to be added
 * to preset-recipies.html page 
 */
function addRecipesToDocument(recipes) {
    // Select table from html
    const table = document.querySelector('table');
    
    // For each recipe fetched: construct the 
    // corresponding row and cell for the table
    for(let i=0; i<recipes.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <div>
                ${recipes[i]["recipeName"]}
            </div>
        </td>
        <td> 
            <button class="button" id="recipe${i+1}">View/Edit</button>
        </td>
        `;

        table.appendChild(row);
    }

    // Add listeners for all 'View/Edit' buttons and pass 
    //in the correct index
    const buttons = document.querySelectorAll('button');
    for(let i=0; i<buttons.length; i++) {
        buttons[i].addEventListener('click', (event) => {
            localStorage.setItem('Condition','Create');
            window.location = `../CustomizeRecipe/customize.html`;
            localStorage.setItem('index', i);
        });
    }
}
