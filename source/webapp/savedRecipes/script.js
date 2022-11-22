window.addEventListener('DOMContentLoaded', init);
window.onload = function(){
    this.loadHome();
}

function init(){
    let recipes = getRecipesFromStorage();
    addRecipesToDocument(recipes);
    
    localStorage.removeItem('index');
    let savedArr = JSON.parse(localStorage.getItem("savedRecipes"));

    for (let i = 0; i < recipes.length; i++) {
        let reviewButtonEl = document.getElementById(`recipe${i}`);
        let removeButtonEl = document.getElementById(`remove${i}`);
        reviewButtonEl.addEventListener('click', () => {
            window.location = "../CustomizeRecipe/customize.html";
            localStorage.setItem("savedIndex", i);
        })
        removeButtonEl.addEventListener('click', (event) => {
          removeEachRecipes(event.target.name, savedArr);
        })
    }
}

function removeEachRecipes (name, savedArr){

  let nameRecipes = localStorage.getItem("nameRecipes");
  let tbl = document.querySelector("table");

  nameRecipes = nameRecipes.split(",");

  for (let i = 0; i < savedArr.length; ++i){
    if (savedArr[i]["recipeName"] == name){
      savedArr.splice(i, 1);
      nameRecipes.splice(i, 1);
      tbl.deleteRow(i+1);
      break;
    }
  }

  localStorage.removeItem(name);

  localStorage.setItem("nameRecipes", nameRecipes.toString());
  localStorage.setItem("savedRecipes",JSON.stringify(savedArr));
}

function getRecipesFromStorage() {
    return JSON.parse(window.localStorage.getItem('savedRecipes'));
}

function addRecipesToDocument(recipes) {
    let tbl = document.querySelector("table");
    for (var i = 0; i < recipes.length; i++) {
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
  