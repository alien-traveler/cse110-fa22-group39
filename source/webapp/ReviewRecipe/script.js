window.addEventListener("DOMContentLoaded", init);
window.onload = function () {
  this.loadHome();
};
function init() {
  let custome = JSON.parse(localStorage.getItem("custom"));

  const recipeName = document.getElementById("coffeeName");
  const coffeeType = document.getElementById("coffeeName1");
  const drinkName = document.getElementById("drinkTypeInput");
  const drinkSize = document.getElementById("sizeTypeInput");
  const addOn = document.querySelectorAll("#Topping");
  let shopEl;

  let drinkType = { 1: "Cappuccinos", 2: "Latte", 3: "Espresso" };
  let size = { 1: "S", 2: "M", 3: "L" };

  recipeName.value = custome["recipeName"];
  coffeeType.value = custome["coffeeType"];
  drinkName.value = drinkType[custome["drinkType"]];
  drinkSize.value = size[custome["size"]];

  const customeAdd = custome["addOns"];
  for (let i = 0; i < customeAdd.length; i++) {
    addOn[customeAdd[i]].checked = true;
  }
  const addOnArr = [];
  for (let i = 0; i < addOn.length; i++) {
    if (addOn[i].checked) {
      addOnArr.push(i);
    }
  }

  const review = {
    recipeName: recipeName.value,
    coffeeType: coffeeType.value,
    drinkType: custome["drinkType"],
    size: custome["size"],
    addOns: addOnArr,
    availableShop: [],
  };

  //check shops
  let shops = JSON.parse(localStorage.getItem("shops"));
  let numShops = 1;
  console.log(shops[0]["drinkType"]);
  console.log(drinkName.value);
  for (let i = 0; i < shops.length; i++) {
    if (
      shops[i]["coffeeType"].includes(coffeeType.value) &&
      shops[i]["drinkType"].includes(drinkName.value) &&
      shops[i]["size"].includes(drinkSize.value)
    ) {
      review["availableShop"].push(shops[i]["shopName"]);
      shopEl = document.getElementById(`shopName${numShops}`);
      shopEl.value = shops[i]["shopName"];
      numShops++;
    }
  }
  console.log(review);

  const buttonEl = document.querySelector("button");
  const newRecipe = JSON.stringify(review);
  const newRecipeName = review.recipeName;

  const notRepeat = checkRepeatName(newRecipeName);
  if (!notRepeat) {
    alert(
      "The recipe name already exists. Please rename your recipe or the old recipe will be replaced."
    );
  }

  buttonEl.addEventListener("click", () => {
    let currentNames = localStorage.getItem("nameRecipes");
    if (currentNames === null) {
      let newRecipeArray = new Array(newRecipeName);
      localStorage.setItem("nameRecipes", newRecipeArray.toString());
    } else {
      let currentNamesArray = currentNames.split(",");
      currentNamesArray.push(newRecipeName);
      localStorage.setItem("nameRecipes", currentNamesArray);
    }

    localStorage.setItem(review.recipeName, newRecipe);

    let currentRecipes = localStorage.getItem("savedRecipes");
    if (currentRecipes === null) {
      let recipeArray = [];
      recipeArray.push(review);
      console.log("the first recipe " + recipeArray);
      localStorage.setItem("savedRecipes", JSON.stringify(recipeArray));
    } else {
      let currentRecipesArray = JSON.parse(currentRecipes);
      console.log("the current recipes array" + currentRecipesArray);
      currentRecipesArray.push(review);
      localStorage.setItem("savedRecipes", JSON.stringify(currentRecipesArray));
    }

    localStorage.setItem("review", JSON.stringify(review));
    window.location = "../savedRecipes/savedRecipes.html";
  });
}

function checkRepeatName(newName) {
  const currentNames = localStorage.getItem("nameRecipes");
  if (currentNames === null) {
    return true;
  } else {
    for (const name in currentNames) {
      if (currentNames[name] === newName) {
        return false;
      }
    }
  }
  return true;
}
