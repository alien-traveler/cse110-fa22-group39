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
  tbl.innerHTML = "";   // Clear table for repopulation

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
    // They splice the fetched recipe list and updates localStorage
    ButtonEl = document.getElementById(`delete${i}`);
    ButtonEl.addEventListener('click', () => {
      recipes.splice(i, 1);
      updateRecipes(recipes, i);
  })
  }
}

function lookUp() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("input");
  filter = input.value.toUpperCase();
  table = document.querySelector("table")
  tr = table.getElementsByTagName("tr");

  if (filter.length != 0) {
    tr[0].style.display = "none";
  } else {
    for (var i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }
  }

  for (var i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent.toUpperCase() || td.innerText.toUpperCase();
      var match = true;
      if (filter.length <= txtValue.length) {
        for (var j = 0; j < filter.length; j++) {
           if (txtValue[j] != filter[j]) {
                tr[i].style.display = "none";
                match = false;
                break;
            }
        }
        if (match) {
            tr[i].style.display = "";
        }
      }
    }
  }
}
  