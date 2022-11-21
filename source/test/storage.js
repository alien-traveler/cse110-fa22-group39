// storage.js

// Create a wrapper object to hold all of the storage functions
// for easy exporting
export const storage = {};

/**
 * Returns an array with all of the elements currently in the cart
 * @returns {Array} An array of IDs of items that are in the cart
 */
storage.getItems = () => {
  // localStorage only stores strings so you must JSON.parse() any arrays
  return JSON.parse(localStorage.getItem('cart')) || [];
};

/**
 * Adds an item to the cart and stores that cart
 */
storage.addItem = function (id) {
  // Get the current cart
  const currCart = storage.getItems();
  // Add the id of the new item to the cart
  currCart.push(id);
  // localStorage only stores strings so you must JSON.stringify() any arrays
  localStorage.setItem('cart', JSON.stringify(currCart));
};

/**
 * Removes an item from the cart and then stores that new cart
 */
storage.removeItem = function (id) {
  // Get the current cart
  const currCart = storage.getItems();
  // Get the index of the item to remove
  const indexOfId = currCart.indexOf(id);
  // Remove that index of the item to remove from the cart
  if (indexOfId > -1) currCart.splice(indexOfId, 1);
  // localStorage only stores strings so you must JSON.stringify() any arrays
  localStorage.setItem('cart', JSON.stringify(currCart));
};