window.addEventListener('DOMContentLoaded', init);
window.onload = function(){
    this.loadHome();
}

function init(){
    let recipes = getRecipesFromStorage();
    addRecipesToDocument(recipes);
    for (var i = 0; i < recipes.length; i++) {
        let ButtonEl = document.querySelectorAll("button")[i];
        ButtonEl.addEventListener('click', () => {
            window.location = "../CustomizeRecipe/customize.html";
        })
    }
}

function getRecipesFromStorage() {
    return JSON.parse(window.localStorage.getItem('savedRecipes'));
}

function addRecipesToDocument(recipes) {
    var tbl = document.querySelector("table");
    for (var i = 0; i < recipes.length; i++) {
      tbl.insertRow(-1).innerHTML = `<td><div>${recipes[i].recipeName}</div></td>
      <td><button class="button" id="recipe1">View/Edit</button></td>`
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
  