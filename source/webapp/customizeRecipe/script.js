window.addEventListener("DOMContentLoaded", init);

window.onload = function () {
  this.loadHome();
};

/**
 * Load the data of coffee recipe from localStorage, and show them on
 * CustomizeRecipe.html page and users can change their flavor on this
 * page. This function also helps to store the data of coffee recipes
 * into localStorage.
 */
function init() {
  // All input fields
  const recipeName = document.getElementById("name");
  const coffeeType = document.querySelectorAll('[name="coffee-type"]');
  const drinkName = document.getElementById("drinks-name");
  const drinkSize = document.getElementById("size-name");
  const addOn = document.querySelectorAll("#topping");

  // If there is an index passed in:
  // use the 'index' key from localStorage to fetch the
  // recipe with the corresponding index from 'recipes'
  // and sets all the fields with said recipe
  const index = localStorage.getItem("index");

  //users entered this page by clicking preset
  if (index) {
    const preset = JSON.parse(localStorage.getItem("recipes"))[index];

    recipeName.value = preset["recipeName"];

    if (preset["coffeeType"] == "Hot") coffeeType[0].checked = true;
    else coffeeType[1].checked = true;

    drinkName.selectedIndex = preset["drinkType"];
    drinkSize.selectedIndex = preset["size"];

    const presetAdd = preset["addOns"];
    for (let i = 0; i < presetAdd.length; i++) {
      addOn[presetAdd[i]].checked = true;
    }
    localStorage.removeItem("savedIndex");
  }

  const savedIndex = localStorage.getItem("savedIndex");
  //users entered this page by clicking savedRecipes
  if (savedIndex) {
    const allSaved = JSON.parse(localStorage.getItem("savedRecipes"))[
      savedIndex
    ];

    recipeName.value = allSaved["recipeName"];
    const condition = localStorage.getItem("Condition");
    // users want to edit the recipes
    if (condition === "Edit") {
      localStorage.setItem("OldNameEdit", allSaved["recipeName"]);
    }

    if (allSaved["coffeeType"] == "Hot") coffeeType[0].checked = true;
    else coffeeType[1].checked = true;

    drinkName.selectedIndex = allSaved["drinkType"];
    drinkSize.selectedIndex = allSaved["size"];

    const allSavedAdd = allSaved["addOns"];
    for (let i = 0; i < allSavedAdd.length; i++) {
      addOn[allSavedAdd[i]].checked = true;
    }
  }

  // Listen for valid submits (all fields entered)
  const form = document.querySelector("form");
  const condition = localStorage.getItem("Condition");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent refreshing page

    if (!checkRepeatName(recipeName.value, condition)) {
      alert("The recipe name already exists. Please rename your recipe.");
    } else {
      // Store all checked addons
      const addOnArr = [];
      for (let i = 0; i < addOn.length; i++) {
        if (addOn[i].checked) {
          addOnArr.push(i);
        }
      }

      // Generate map of the form:
      // "recipeName" : String
      // "coffeeType" : String, either "Hot" or "Cold"
      // "drinkType" : Index  1: "Cappucinos"
      //                      2: "Latte"
      //                      3: "Espresso"
      // "size" : Index from  1: "S"
      //                      2: "M"
      //                      3: "L"
      // "addOns" : Index array of all included add-ons:
      //                      0: "Caramel"
      //                      1: "Sugar"
      //                      2: "Extra Short"
      //                      3: "Milk"
      //                      4: "Cream"
      //                      5: "Water"
      const custom = {
        recipeName: recipeName.value,
        coffeeType: coffeeType[0].checked ? "Hot" : "Cold",
        drinkType: drinkName.selectedIndex,
        size: drinkSize.selectedIndex,
        addOns: addOnArr,
      };

      // Store to localStorage with key of customized recipe NAME
      const newRecipe = JSON.stringify(custom);
      localStorage.setItem("custom", newRecipe);

      // Go to review
      window.location = "../reviewRecipe/reviewRecipe.html";
    }
  });
}

/**
 * check the recipe name to see whether there are same names in the local storage
 * @param {string} newName name of the new recipe
 * @returns true if no repeats, false otherwise
 */
function checkRepeatName(newName, condition) {
  const oldName = localStorage.getItem("OldNameEdit");
  const currentNames = localStorage.getItem("nameRecipes");
  // nameRecipes doesn't exist: this is the first name
  if (currentNames === null) {
    return true;
  } else {
    //nameRecipes exists, check previous names
    const currentNamesArray = currentNames.split(",");
    if (condition === "Create") {
      for (const name in currentNamesArray) {
        if (currentNamesArray[name] === newName) {
          return false;
        }
      }
    } else {
      for (const name in currentNamesArray) {
        if (
          currentNamesArray[name] === newName &&
          currentNamesArray[name] !== oldName
        ) {
          return false;
        }
      }
    }
  }
  return true;
}
