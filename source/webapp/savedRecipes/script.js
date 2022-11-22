window.addEventListener('DOMContentLoaded', init);
window.onload = function(){
    this.loadHome();
}

function init(){
  // Fetch saved recipes from localStorage
  let recipes = getRecipesFromStorage();

  // Populate html with fetched recipes
  populateDocument(recipes);
}

function getRecipesFromStorage() {
    return JSON.parse(window.localStorage.getItem('saved'));
}

/**
 * Takes a new list of recipes and updates them to localStorage
 * Repopulates the table
 * Param: recipes - the updated list of recipes
 */ 
function updateRecipes(recipes) {
  localStorage.setItem('saved', JSON.stringify(recipes));
  populateDocument(recipes);
}

function populateDocument(recipes) {
  // Fetch the table from the page
  const tbl = document.querySelector("table");
  tbl.innerHTML = `
  <tr>
      <td style="width:60%">
          <div class="tableEl" id="page-title">
              All Saved Recipes
          </div>
      </td>
  </tr>`;   // Clear table for repopulation

  // Populate the table by adding rows (recipes)
  for (let i = 0; i < recipes.length; i++) {
    const row = document.createElement('tr');
    row.id = `row${i}`;   // Assign correct id for other functions
    row.innerHTML = `
    <td>
        <div>
            ${recipes[i].recipeName}
        </div>
    </td>
    <td>
        <button class="button" id="view${i}">View/Edit</button>
    </td>
    <td>
        <button class="button" id="delete${i}">Delete</button>
    </td>`;

    tbl.appendChild(row);
  }

  // Assign button functions
  let ButtonEl;
  for (let i = 0; i < recipes.length; i++) {
    // Select View/Edit buttons by id
    // They go to the customization page with corresponding index
    ButtonEl = document.getElementById(`view${i}`);
    ButtonEl.addEventListener('click', () => {
        window.location = "../CustomizeRecipe/customize.html";
        localStorage.setItem('index', i);       // Pass in correct index
        localStorage.setItem('mode', 'saved');  // Pass in correct mode
    })

    // Select delete button by id
    // Then splice the fetched recipe list and updates localStorage
    ButtonEl = document.getElementById(`delete${i}`);
    ButtonEl.addEventListener('click', () => {
      recipes.splice(i, 1);
      updateRecipes(recipes, i);
  })
  }
}

function lookUp() {
  const recipes = getRecipesFromStorage();                              // Recipes
  const table = document.querySelector('table');                        // Table
  const input = document.querySelector('input').value.toUpperCase();    // Input (search query)
  const rows = table.querySelectorAll('tr');                            // Rows

  // If there is an input, no longer show "All Saved Recipes"
  // Otherwise, show everything
  if(input.length!=0) {
    rows[0].style.display = "none";
  } else {
    for (let i = 0; i < rows.length; i++) {
      rows[i].style.display = "";
    }
  }

  // For each row in the table:
  for(let i=1; i<rows.length; i++) {
    // Fetch corresponding saved recipe name
    const title = recipes[i-1]["recipeName"].toUpperCase();
    let match = true;

    // If the input is equal to or lesser length than recipe name
    if(input.length<=title.length) {
      // Compare each letter
      for(let j=0; j<input.length; j++) {
        if(title[j]!=input[j]) {
          rows[i].style.display = "none";
          match = false;
          break;
        }
      }
      // Show row if name matches
      if(match) {
        rows[i].style.display = "";
      }
    }
  }
}
  