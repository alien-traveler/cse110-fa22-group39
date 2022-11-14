window.addEventListener('DOMContentLoaded', init);

function init(){
    // Fetch the recipes from localStorage
    let recipes = localStorage.getItem('recipes');
    if(recipes) recipes = JSON.parse(recipes);
    else recipes = [];

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

    // Add listeners for all 'View/Edit' buttons and pass in the correct index
    const buttons = document.querySelectorAll('button');
    for(let i=0; i<buttons.length; i++) {
        buttons[i].addEventListener('click', (event) => {
            window.location = `../CustomizeRecipe/customize.html`;
            localStorage.setItem('index', i);
        });
    }
}