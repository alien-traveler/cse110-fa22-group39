window.addEventListener("DOMContentLoaded", init);

async function init() {
  let recipes;

  try {
    recipes = await getRecipes();
  } catch (error) {
    console.log(error);
  }

  addRecipesToDocument(recipes);
}

async function getRecipes() {
  // Fetch the recipes from localStorage
  let recipes = localStorage.getItem("recipes");
  if (recipes) return JSON.parse(recipes);

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

function saveRecipes(recipes) {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function addRecipesToDocument(recipes) {
  // Select table from html
  const table = document.querySelector("table");

  // For each recipe fetched: construct the
  // corresponding row and cell for the table
  for (let i = 0; i < recipes.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <div>
                ${recipes[i]["recipeName"]}
            </div>
        </td>
        <td> 
            <button class="button" id="recipe${i + 1}">View/Edit</button>
        </td>
        `;

    table.appendChild(row);
  }

  // Add listeners for all 'View/Edit' buttons and pass in the correct index
  const buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {
      window.location = `../customizeRecipe/customize.html`;
      localStorage.setItem("index", i);
    });
  }
}
