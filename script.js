'use strict';

// declare constants
const TXT_NAME = document.getElementById('txt-name');
const TXT_PRICE = document.getElementById('txt-price');
const TXT_BARCODE = document.getElementById('txt-barcode');
const TXT_QUANTITIES = document.getElementById('txt-quantity');
const P_SHOW_ALL_ITEMS = document.getElementById('p-show-all-items');
const TXT_REMOVE_ITEM = document.getElementById('txt-remove-item');
const P_SHOW_SORTING_ITEMS = document.getElementById('p-show-items-sorting-by-price');
const P_SHOW_SEARCHING_ITEMS = document.getElementById('p-show-searching-items');
const TXT_SEARCH_PRICED_ITEMS = document.getElementById('txt-search-priced-items');

// declare arrays
let itemNames = ['Bags', 'Toys', 'Sandwhiches', 'Pens'];
let itemPrices = [10, 20, 15, 10];
let itemBarcodes = [45092, 45678, 45679, 25817];
let itemQuantities = [5, 3, 2, 10];


// increases the array by 1 element, add the new item to the end of the array and returns the newly resized array
function pushArray(array, item){
  // create a new array that is one element larger than the original
  let bigger = new Array(array.length + 1);

  // array copy - copy everything from array into bigger
  for (let i = 0; i < array.length; i++){
    bigger[i] = array[i];
  }

  // add item to the end of the smaller array
  bigger[bigger.length - 1] = item;

  return bigger;
}

// Add an item to the program 
function addItem(){
  let itemPricesInput = TXT_PRICE.value;
  let itemBarcodesInput = TXT_BARCODE.value;
  let itemQuantitiesInput = TXT_QUANTITIES.value;

  // assign itemNames to be the bigger / resized array that pushArray returns
  itemNames = pushArray(itemNames, TXT_NAME.value);

  // convert itemPrices from strings to numbers
  itemPricesInput = Number(itemPricesInput);
  // assign itemPrices to be the bigger array that pushArray returns
  itemPrices = pushArray(itemPrices, itemPricesInput);

  // convert itemBarcodes from strings to numbers
  itemBarcodesInput = Number(itemBarcodesInput);
  // assign itemBarcodes to be the bigger array that pushArray returns
  itemBarcodes = pushArray(itemBarcodes, itemBarcodesInput);

  // convert itemQuantities from strings to numbers
  itemQuantitiesInput = Number(itemQuantitiesInput);
  // assign itemQuantities to be the bigger array that pushArray returns
  itemQuantities = pushArray(itemQuantities, itemQuantitiesInput);

  // clear the textboxes
  TXT_NAME.value = '';
  TXT_PRICE.value = '';
  TXT_QUANTITIES.value = '';
  TXT_BARCODE.value = '';

  // print the new array to the paragraph
  printArrayToParagraph();
}

// create an string that contains all 4 arrays
function createArrayString(){
  // create the string that will hold all the array elements
  let str = '';

  // go through each index in the array, starting at 0, going to array.length-1
  for (let i = 0; i < itemNames.length; i++){
    str += 'Item Names: ' + itemNames[i] + '\n Item Prices: $' + itemPrices[i] + '\n Item Barcode: ' + itemBarcodes[i] + '\n Item Quantity: ' + itemQuantities[i] + '\n\n';
  }
  return str;
}

// print all 4 arrays to the paragraph
function printArrayToParagraph(){
  P_SHOW_ALL_ITEMS.innerText = createArrayString();
}

// get the index of the item that is about to be removed
function getRemovedItemIndex(array, removedItem){

  // set the index of the removedItem as undefined
  let removedItemIndex = -1;

  // find the removed item index by tranversing through the array
  for (let i = 0; i < array.length; i++){
    // if the item is found, assign the index to the removedItemIndex variable
    if (array[i] == removedItem){
      removedItemIndex = i;
    }
  }
  return removedItemIndex;
}
  
// remove an array index
function removeArray(array, removedItemIndex){

  // if there is no removedItemIndex, reuturn the orginal array
  if (removedItemIndex < 0){
    return array;
  }

  // leave the index of the item removed blank
  array [removedItemIndex] = '';

  // make every array element after the blank index shift left by 1 index.
  for (let i = removedItemIndex; i < array.length - 1; i++){
    array[i] = array[i + 1];
  }

  // make a new array that its length is 1 less than the original
  let newArray = new Array(array.length-1);

  // copy everythig from the original array to the new array
  for (let i = 0; i < newArray.length; i++){
    newArray[i] = array[i];
  }

  return newArray;
}

// remove the item that the user typed in
function removeItem(){
  // get the value of the textbox
  let removedItem = TXT_REMOVE_ITEM.value;
  // get the index of the removed item
  let i = getRemovedItemIndex(itemBarcodes, removedItem);
  //remove the item from the itemBarcodes array
  itemBarcodes = removeArray(itemBarcodes, i);
  //remove the item from the itemNames array
  itemNames = removeArray(itemNames, i);
  //remove the item from the itemPrices array
  itemPrices = removeArray(itemPrices, i);
  //remove the item from the itemQuantities array
  itemQuantities = removeArray(itemQuantities, i);
  // update in the paragraph
  printArrayToParagraph();
  // clear the textbox
  TXT_REMOVE_ITEM.value = ''; 
}

// copy orginal array to the new array
function copyArray(array){
  // make a new array
  let newArray = new Array (array.length);
  // copy orginal to the new array
  for (let i = 0; i < array.length; i++){
    newArray[i] = array[i];
  }
  return newArray;
}

// sort 4 arrays in ascending order of priceArray
function ascendingSelectionSort(priceArray, quantityArray, barcodeArray, nameArray){
// PSEUDOCODE for sorting ASCENDING (smallest to biggest)
// 1. Chooses the next smallest item in an array.
// 2. Repeast until the 2nd last item has been sorted. Since everything before the last item is sorted. and the last item is automatically sorted
// minus 1 is because you don't need to compare the last letter as the
  let str = '';
  for (let k = 0; k < priceArray.length-1; k++){
    // Find the smallest item in the array
    // asume that the first index has the smallest
    let indexOfSmallest = k;
  
    // look through the rest of the array to find anything smaller
    for (let i = k+1; i < priceArray.length; i++){
      // check to see if the current element is smaller than our smallest
      if (priceArray[i] < priceArray[indexOfSmallest]){
        // found something smaller, keep it
        indexOfSmallest = i;
      }
    }
    // store the first element temporarily before swapping the smallest element in
    let temp = priceArray[k];
    priceArray[k] = priceArray[indexOfSmallest];
    priceArray[indexOfSmallest] = temp;
    
    temp = nameArray[k];
    nameArray[k] = nameArray[indexOfSmallest];
    nameArray[indexOfSmallest] = temp;

    temp = quantityArray[k];
    quantityArray[k] = quantityArray[indexOfSmallest];
    quantityArray[indexOfSmallest] = temp;
    
    temp = barcodeArray[k];
    barcodeArray[k] = barcodeArray[indexOfSmallest];
    barcodeArray[indexOfSmallest] = temp;

  }
    // make a string that stores the new order of the arrays
    for (let i = 0; i < priceArray.length; i++){
    str += 'Item Names: ' + nameArray[i] + '\n Item Prices: $' + priceArray[i] + '\n Item Barcode: ' + barcodeArray[i] + '\n Item Quantity: ' + quantityArray[i] + '\n\n';
    }
    return str;
}

// ascending the items by item's price
function ascendingItemPrice(){
  // make a copy of the orginal array
  let itemPricesCopy = copyArray(itemPrices);
  let itemBarcodesCopy = copyArray(itemBarcodes);
  let itemQuantitiesCopy = copyArray(itemQuantities);
  let itemNamesCopy = copyArray(itemNames);

  // print the string into the paragraph
  P_SHOW_SORTING_ITEMS.innerText = ascendingSelectionSort(itemPricesCopy, itemQuantitiesCopy, itemBarcodesCopy, itemNamesCopy);
}

// sort arrays into descending order by priceArray
function descendingSelectionSort(priceArray, quantityArray, barcodeArray, nameArray){
  let str = '';
  for (let k = 0; k < priceArray.length-1; k++){
      // Find the biggest item in the array
      // asume that the first index has the biggest
      let indexOfBiggest = k;

      // look through the rest of the array to find anything bigger
      for (let i = k+1; i < priceArray.length; i++){
        // check to see if the current element is bigger than our biggest
        if (priceArray[i] > priceArray[indexOfBiggest]){
          // found something bigger, keep it
          indexOfBiggest = i;
        }
      }

      // store the first element temporarily before swapping the biggest element in
      let temp = priceArray[k];
      priceArray[k] = priceArray[indexOfBiggest];
      priceArray[indexOfBiggest] = temp;

      temp = nameArray[k];
      nameArray[k] = nameArray[indexOfBiggest];
      nameArray[indexOfBiggest] = temp;

      temp = quantityArray[k];
      quantityArray[k] = quantityArray[indexOfBiggest];
      quantityArray[indexOfBiggest] = temp;
      
      temp = barcodeArray[k];
      barcodeArray[k] = barcodeArray[indexOfBiggest];
      barcodeArray[indexOfBiggest] = temp;
    }
    for (let i = 0; i < priceArray.length; i++){
      str += 'Item Names: ' + nameArray[i] + '\n Item Prices: $' + priceArray[i] + '\n Item Barcode: ' + barcodeArray[i] + '\n Item Quantity: ' + quantityArray[i] + '\n\n';
      }
      return str;
  }

  // print items sorting by descending order of the item's price to the pragraph
  function descendingItemPrice(){
    P_SHOW_SORTING_ITEMS.innerText = descendingSelectionSort(itemPrices, itemQuantities, itemBarcodes, itemNames);
  }

// finds the smallest value in the array, and returns the index of every element equal to the smallest value
function findAllMinimum(array){

  // the index of the smallest element
  let indexOfSmallest = 0;
  // count how many items to equal to the smallest
  let countOfSmallest = 1;

  // go through the entire array, looking for the smallest item, and how many there are
  for (let i = 1; i < array.length; i++){

    // if we find an array element that is smallest than out current smallest, we need to update our smallest
    if (array[i] < array[indexOfSmallest]){
      indexOfSmallest = i;
      // reset the count
      countOfSmallest = 1;
    }
    // if we find an array element equal to our smallest, count it
    else if (array[i] == array[indexOfSmallest]){
      countOfSmallest++;
    }
  }

  // make an array to store the index location of every element equal to smallest element
  let indexes = new Array(countOfSmallest);

  // count how many smallest items were added
  let countAdded = 0;

  // go through the array again, to find all of the elements that are the smallest
  for (let i = 0; i < array.length; i++){

    // when we find a smallest element, add it to the array
    if (array[i] == array[indexOfSmallest]){
      indexes[countAdded] = i;

      // increase the count of items added
      countAdded++;
    }
  }
  return indexes;
}

// print all items that has the minimum price
function printAllMinimumPrice(){
  // get the index of the items that has the minimum prices
  let minimumIndex = findAllMinimum(itemPrices);
  // clear paragraph
  P_SHOW_SEARCHING_ITEMS.innerText = '';

  // print out the letters matching up with the minimum members
  for (let i = 0; i < minimumIndex.length; i++){
    P_SHOW_SEARCHING_ITEMS.innerText += 'Item Name: ' + itemNames[minimumIndex[i]] + '\n' + 'Item Price: $' + itemPrices[minimumIndex[i]] + '\n' + 'Item Barcode: ' + itemBarcodes[minimumIndex[i]] + '\n' + 'Item Quantity: ' + itemQuantities[minimumIndex[i]] + '\n\n';
  }
}

function searchLowerThanInput(array, input){
  // set count as 0
  let count = 0;
  // find the size of the indexArray by finding how many items are under the input's price
  for (let i = 0; i < array.length; i++){
    // increase count by 1 once it finds a item that is smaller than the input
    if (array[i] < input){
      count++;
    }
  }

  // make a new array that is sized by how many times the items are smaller than the input
  let indexArray = new Array(count);
  // make a new index and set it as 0
  let newIndex = 0;
  for (let i = 0; i < array.length; i++){
    // If the array is less than input, the index of that element is added to a new array called indexArray
    if (array[i] < input){
      indexArray[newIndex] = i;
      // newIndex increase by 1
      newIndex++;
    }
  }
  return indexArray;
}

// search items under a certain price that the user typed in
function searchItemsUnderCertainPrice(){
  // clear paragraph
  P_SHOW_SEARCHING_ITEMS.innerText = '';
  // get the textbox value
  let input = TXT_SEARCH_PRICED_ITEMS.value;
  // save the items under a certain price 
  let index = searchLowerThanInput(itemPrices, input);
  // print the array into the paragraph
  for (let i = 0; i < index.length; i++){
    P_SHOW_SEARCHING_ITEMS.innerText += 'Item Name: ' + itemNames[index[i]] + '\n' + 'Item Price: $' + itemPrices[index[i]] + '\n' + 'Item Barcode: ' + itemBarcodes[index[i]] + '\n' + 'Item Quantity: ' + itemQuantities[index[i]] + '\n\n';
  }
}