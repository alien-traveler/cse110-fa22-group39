window.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    await getShops();
  } catch (error) {
    console.log(error);
  }

  let createButtonEl = document.querySelectorAll("button")[0];
  createButtonEl.addEventListener("click", () => {
    window.location = "./preset-customize/choice.html";
  });
  let saveButtonEl = document.querySelectorAll("button")[1];
  saveButtonEl.addEventListener("click", () => {
    window.location = "./savedRecipes/savedRecipes.html";
  });
}

async function getShops() {
  // Fetch the recipes from localStorage
  let shops = localStorage.getItem("shops");
  if (shops) return JSON.parse(shops);

  return new Promise(async (resolve, reject) => {
    try {
      shops = await fetch("../shops.json");
      shops = await shops.json();
      localStorage.setItem("shops", JSON.stringify(shops));
      resolve(shops);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
