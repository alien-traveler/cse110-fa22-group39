window.addEventListener('DOMContentLoaded', init);
window.onload = function(){
    this.loadHome();
}

/**
 * add View/Edit and delete buttons for each recipes in allSavedRecipes 
 * page. For View/Edit button, it will direct to CustomizeRecipe.html 
 * and load the corresponding coffee recipes data into that page. For 
 * delete button, it will remove the corresponding data of coffee recipes
 * from localStorage, and remove from this page as well.
 */
function init(){
  //add all the saved recipes to the page
  let recipes = getRecipesFromStorage();
  addRecipesToDocument(recipes);
    
  //prevent loading data from preset coffee recipes
  localStorage.removeItem('index');
  let savedArr = JSON.parse(localStorage.getItem("savedRecipes"));

  //add buttons for each coffee recipes
  for (let i = 0; i < recipes.length; i++) {
      let reviewButtonEl = document.getElementById(`recipe${i}`);
      let removeButtonEl = document.getElementById(`remove${i}`);
      reviewButtonEl.addEventListener('click', () => {
          localStorage.setItem('Condition','Edit');
          window.location = "../customizeRecipe/customizeRecipe.html";
          localStorage.setItem("savedIndex", i);
      })
      removeButtonEl.addEventListener('click', (event) => {
        removeEachRecipes(event.target.name, savedArr);
      })
  }

  scrollable();
}

/**
 * Remove the corresponding data of coffee recipes from localStorage if 
 * users click the delete button right after the View/Edit button.
 * @param {string} name the name of the recipes 
 * @param {array} savedArr all saved recipes array
 */
function removeEachRecipes (name, savedArr){
  //defined and set all the needed elements
  let nameRecipes = localStorage.getItem("nameRecipes");
  let tbl = document.querySelector("table");

  nameRecipes = nameRecipes.split(",");

  //delete the corresponding data of coffee recipe iteratively
  for (let i = 0; i < savedArr.length; ++i){
    if (savedArr[i]["recipeName"] == name){
      //delete data from all saved recipes array
      savedArr.splice(i, 1);
      nameRecipes.splice(i, 1);
      //delete from SavedRecipes.html page
      tbl.deleteRow(i+1);
      break;
    }
  }

  localStorage.removeItem(name);
  //update the data from localStorage and push them back
  localStorage.setItem("nameRecipes", nameRecipes.toString());
  localStorage.setItem("savedRecipes",JSON.stringify(savedArr));
}

/**
 * Makes the table storing all the saved recipes scrollable
 */
 function scrollable() {
  document.querySelector("table").style.overflowY = "scroll";
}

/**
 * Get data of coffee recipes whose key is "savedRecipes" from localStorage
 * @returns {array} an array of all the coffee recipes from localStorage
 */
function getRecipesFromStorage() {
    return JSON.parse(window.localStorage.getItem('savedRecipes'));
}

/**
 * add rows to the table on this SavedRecipes.html page for each recipes
 * @param {array} recipes an array of coffee recipes needed to be added
 * to SavedRecipes.html page 
 */
function addRecipesToDocument(recipes) {
    let tbl = document.querySelector("table");
    for (var i = 0; i < recipes.length; i++) {
      //add View/Edit and delete button for each recipe
      tbl.insertRow(-1).innerHTML = `<td><div>${recipes[i].recipeName}</div></td>
      <td>
        <button class="button" id="recipe${i}">View/Edit</button>
      </td>
      <td>
        <button class="button" id="remove${i}" name = "${recipes[i].recipeName}">Delete</button>
      </td>`
    }
}

function lookUp() {
  //define and set all needed variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("input");
  filter = input.value.toUpperCase();
  table = document.querySelector("table")
  tr = table.getElementsByTagName("tr");

  //when searching, hide the words "All saved recipes"
  if (filter.length != 0) {
    tr[0].style.display = "none";
  //when search bar has no character, display everything
  } else {
    for (var i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }
  }

  //traverse over all the saved recipes
  for (var i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      //get the name of saved recipe
      txtValue = td.textContent.toUpperCase() || td.innerText.toUpperCase();
      var match = true;
      //this "if" make sure the program won't crahsed when overloaded with search
      if (filter.length <= txtValue.length) {
        //traverse through all characters in the search bar
        for (var j = 0; j < filter.length; j++) {
          //if any character unmatch, hide this recipe 
          if (txtValue[j] != filter[j]) {
                tr[i].style.display = "none";
                match = false;
                break;
            }
        }
        //if every thing matches so far, keep showing this recipe
        if (match) {
            tr[i].style.display = "";
        }
      }
    }
  }
}