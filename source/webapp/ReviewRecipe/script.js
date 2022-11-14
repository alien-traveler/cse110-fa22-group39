window.addEventListener('DOMContentLoaded', init);

function init(){
    let custome = JSON.parse(localStorage.getItem("custom"));
    
    const recipeName = document.getElementById('coffeeName');
    const coffeeType = document.getElementById('coffeeName1');
    const drinkName = document.getElementById('drinkTypeInput');
    const drinkSize = document.getElementById('sizeTypeInput');
    const addOn = document.querySelectorAll('#Topping');

    drinkType = {1: "Cappuccinos", 2: "Latte", 3: "Espresso"};
    size = {"1": "S", "2": "M", "3": "L"};

    recipeName.value = custome["recipeName"];
    coffeeType.value = custome["coffeeType"];
    drinkName.value = drinkType[custome["drinkType"]];
    drinkSize.value = size[custome["size"]];

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
    const buttonEl = document.querySelector("button");
    buttonEl.addEventListener('click', (event) => {
        //event.preventDefault();
        const review = {
            "recipeName" : recipeName.value,
            "coffeeType" : coffeeType.value,
            "drinkType" :  drinkName.value,
            "size" : drinkSize.value,
            "addOns" : addOnArr,
            "available shop": []
        };
        localStorage.setItem('review', JSON.stringify(review));
    })
}