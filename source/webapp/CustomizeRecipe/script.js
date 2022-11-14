window.addEventListener('DOMContentLoaded', init);

function init() {
    // All input fields
    const recipeName = document.getElementById('name');
    const coffeeType = document.querySelectorAll('[name="CoffeeType"]');
    const drinkName = document.getElementById('DrinksName');
    const drinkSize = document.getElementById('SizeName');
    const addOn = document.querySelectorAll('#Topping');
    
    // If there is an index passed in:
    // use the 'index' key from localStorage to fetch the 
    // recipe with the corresponding index from 'recipes' 
    // and sets all the fields with said recipe
    const index = localStorage.getItem('index');
    if(index) {
        const preset = JSON.parse(localStorage.getItem('recipes'))[index];

        recipeName.value = preset["recipeName"];

        if(preset["coffeeType"]=="Hot") coffeeType[0].checked = true;
        else coffeeType[1].checked = true;

        drinkName.selectedIndex = preset["drinkType"];
        drinkSize.selectedIndex = preset["size"];

        const presetAdd = preset["addOn"];
        for(let i=0; i<presetAdd.length; i++) {
            addOn[presetAdd[i]].checked = true;
        }
    }


    // Listen for valid submits (all fields entered)
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();     // Prevent refreshing page

        // Store all checked addons
        const addOnArr = [];
        for(let i=0; i<addOn.length; i++) {
            if(addOn[i].checked) {
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
        // "addOn" : Index array of all included add-ons:
        //                      0: "Caramel"
        //                      1: "Sugar"
        //                      2: "Extra Short"
        //                      3: "Milk"
        //                      4: "Cream"
        //                      5: "Water"
        const custom = {
            "recipeName" : recipeName.value,
            "coffeeType" : (coffeeType[0].checked) ? "Hot" : "Cold",
            "drinkType" :  drinkName.selectedIndex,
            "size" : drinkSize.selectedIndex,
            "addOn" : addOnArr
        };

        // Store to localStorage with key 'custom'
        localStorage.setItem('custom', JSON.stringify(custom));

        // Go to review
        window.location = "../ReviewRecipe/review.html";
    });   
}