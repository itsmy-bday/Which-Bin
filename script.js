var bins = {};

// Load saved items from local storage
if (localStorage.getItem("bins")) {
  bins = JSON.parse(localStorage.getItem("bins"));
}

function searchBin() {
  var searchBox = document.getElementById("searchBox");
  var item = searchBox.value.toLowerCase();
  var result = document.getElementById("result");
  var bin_with_s = item + 's';
  var bin_with_es = item + 'es';

  if (item in bins) {
    result.innerText = "Item goes in: " + bins[item] + '.';
  } else if (bin_with_s in bins) {
    result.innerText = "Item goes in: " + bins[bin_with_s] + '.';
  } else if (bin_with_es in bins) {
    result.innerText = "Item goes in: " + bins[bin_with_es] + '.';
  } else {
    result.innerText = "Item not found.";
  }
}

function displayAutoCompleteList() {
  var itemList = document.getElementById("itemList");
  var searchBox = document.getElementById("searchBox");
  var searchText = searchBox.value.toLowerCase();

  // Clear all
  itemList.innerHTML = "";

  var itemArray = Object.keys(bins);

  // Sort alphabetically
  itemArray.sort();

  // Add options for each item in array
  for (var i = 0; i < itemArray.length; i++) {
    var item = itemArray[i];
    var option = document.createElement("option");

    var highlightedText = item.replace(new RegExp(searchText, "i"), "<strong>$&</strong>");

    option.innerHTML = highlightedText;
    itemList.appendChild(option);
  }
}


// shows the autocomplete list on page load
window.addEventListener("load", displayAutoCompleteList);

function addItem() {
  var addItemBox = document.getElementById("addItemBox");
  var newItem = addItemBox.value.toLowerCase();

  if (newItem.trim() !== "") {
    let which_bin = prompt("Which bin does it go in (recycling, garbage, compost)?: ").toLowerCase();
    if (which_bin === 'recycling' || which_bin === 'garbage' || which_bin === 'compost') {
        bins[newItem] = which_bin;
        addItemBox.value = "";
        saveToLocalStorage();
        alert("New item added successfully!");
        displayDictionary();
    } else {
        alert('Please enter a valid item.');
    }


  } else {
    alert("Please enter a valid item.");
  }
}


function bulkAddItemsFromArray(itemArray, bin) {
  if (Array.isArray(itemArray)) {
    for (var i = 0; i < itemArray.length; i++) {
      var item = itemArray[i].toLowerCase();
      if (item.trim() !== "") {

