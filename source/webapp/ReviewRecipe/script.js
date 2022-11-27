window.addEventListener('DOMContentLoaded', init);
window.onload = function(){
    this.loadHome();
}

/**
 * load the customize data of this coffee recipe from localStorage in a
 * JSON object format to review.html page. It is also able to Find 
 * the coffee shops that meet the requirements of the coffee recipe.
 * Then it checks the repeated names among recipes.
 */
function init(){
    let custome = JSON.parse(localStorage.getItem("custom"));
    
    const recipeName = document.getElementById('coffee-name');
    const coffeeType = document.getElementById('custom-coffee-name');
    const drinkName = document.getElementById('drink-type-input');
    const drinkSize = document.getElementById('size-type-input');
    const addOn = document.querySelectorAll('#topping');
    let shopEl;

    let drinkType = {1: "Cappuccinos", 2: "Latte", 3: "Espresso"};
    let size = {"1": "S", "2": "M", "3": "L"};

    //fill the data to the attributes
    recipeName.value = custome["recipeName"];
    coffeeType.value = custome["coffeeType"];
    drinkName.value = drinkType[custome["drinkType"]];
    drinkSize.value = size[custome["size"]];

    //fill the data of addons 
    const customeAdd = custome["addOns"];
    for(let i=0; i<customeAdd.length; i++) {
        addOn[customeAdd[i]].checked = true;
    }
    const addOnArr = [];
    for(let i=0; i<addOn.length; i++) {
        if(addOn[i].checked) {
            addOnArr.push(i);
        }
    }

    //create JSON object to store a recipe
    const review = {
        "recipeName" : recipeName.value,
        "coffeeType" : coffeeType.value,
        "drinkType" :  custome["drinkType"],
        "size" : custome["size"],
        "addOns" : addOnArr,
        "availableShop": []
    };

    //check shops
    let shops = JSON.parse(localStorage.getItem("shops"));
    let numShops = 1;
    for (let i = 0; i < shops.length; i++){
        //meets the requirement
        if (shops[i]["coffeeType"].includes(coffeeType.value)
        && shops[i]["drinkType"].includes(drinkName.value)
        && shops[i]["size"].includes(drinkSize.value)){
            review["availableShop"].push(shops[i]["shopName"]);
            shopEl = document.getElementById(`shopName${numShops}`);
            shopEl.value = shops[i]["shopName"];
            numShops++;
        }
    }

    const buttonEl = document.querySelector("button");
    const newRecipe = JSON.stringify(review);
    const newRecipeName = review.recipeName;

    //save and continue button
    buttonEl.addEventListener("click", () => {
      const condition = localStorage.getItem("Condition");
      if (condition === "Create") {
        //create recipe
        let currentNames = localStorage.getItem("nameRecipes");
        if (currentNames === null) {
          let newRecipeArray = new Array(newRecipeName);
          localStorage.setItem("nameRecipes", newRecipeArray.toString());
        } else {
          let currentNamesArray = currentNames.split(",");
          currentNamesArray.push(newRecipeName);
          localStorage.setItem("nameRecipes", currentNamesArray);
        }

        localStorage.setItem(newRecipeName, newRecipe);

        let currentRecipes = localStorage.getItem("savedRecipes");
        if (currentRecipes === null) {
          let recipeArray = [];
          recipeArray.push(review);
          localStorage.setItem("savedRecipes", JSON.stringify(recipeArray));
        } else {
          let currentRecipesArray = JSON.parse(currentRecipes);
          currentRecipesArray.push(review);
          localStorage.setItem(
            "savedRecipes",
            JSON.stringify(currentRecipesArray)
          );
        }
      } else {// edit the recipe
        const oldName = localStorage.getItem("OldNameEdit");
        let findName;
        //Name has been changed
        if (oldName !== newRecipeName) {
          findName = oldName;
          //update nameRecipes
          let currentNames = localStorage.getItem("nameRecipes");
          let currentNamesArray = currentNames.split(",");
          for (const eachName in currentNamesArray) {
            if (currentNamesArray[eachName] === oldName) {
              currentNamesArray[eachName] = newRecipeName;
              break;
            }
          }
          localStorage.setItem("nameRecipes", currentNamesArray);

          //update name-recipe pairs
          localStorage.removeItem(oldName);
          localStorage.setItem(newRecipeName, newRecipe);
        }
        // Name stays the same
        else {
          findName = newRecipeName;
          //update name-recipe pairs
          localStorage.setItem(newRecipeName, newRecipe);
        }
        
        //update savedRecipes array
        let currentRecipes = localStorage.getItem("savedRecipes");
        let currentRecipesArray = JSON.parse(currentRecipes);
        for (recipe in currentRecipesArray) {
          const reciName = currentRecipesArray[recipe].recipeName;
          if (findName === reciName) {
            currentRecipesArray[recipe] = review;
            break;
          }
        }
        localStorage.setItem(
          "savedRecipes",
          JSON.stringify(currentRecipesArray)
        );
      }

      localStorage.setItem("review", JSON.stringify(review));
      window.location = "../savedRecipes/savedRecipes.html";
    });

}

