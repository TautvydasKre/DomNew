/** @format */

const doc = document;
const cont = doc.createElement("div");
const form = doc.createElement("form");
const table = doc.createElement("table");

const inputContainer = doc.createElement("div");
inputContainer.style.display = "grid";
inputContainer.style.gridTemplateColumns = "1fr";
inputContainer.style.gridGap = "10px";

const findContainer = doc.createElement("div");
findContainer.style.display = "grid";
findContainer.style.marginLeft = "50px";

const firstInt = doc.createElement("input");
const secondInt = doc.createElement("input");
const thirdInt = doc.createElement("input");
const findInt = doc.createElement("input");

const insert = doc.createElement("button");
const edit = doc.createElement("button");
const del = doc.createElement("button");
const find = doc.createElement("button");

const buttonStyle =
  "width: 150px; height: 30px; margin-right: 10px; border-radius: 10px;";
insert.textContent = "Insert new";
insert.setAttribute("type", "submit");
insert.style = buttonStyle;

edit.textContent = "Edit Item";
edit.setAttribute("type", "submit");
edit.style = buttonStyle;

del.textContent = "Delete From LS";
del.setAttribute("type", "submit");
del.style = buttonStyle;

find.textContent = "Select From LS";
find.setAttribute("type", "submit");
find.style = buttonStyle;

const findTable = doc.createElement("table");
findTable.style.borderCollapse = "collapse";

const findTableHeader = findTable.createTHead();
const findTableBody = findTable.createTBody();

const findTableRow = findTableHeader.insertRow(0);
const findTableCell = findTableRow.insertCell(0);
findTableCell.textContent = "Selected Item Values";

const findTableValueRow = findTableBody.insertRow(0);
const findTableValueCell1 = findTableValueRow.insertCell(0);
const findTableValueCell2 = findTableValueRow.insertCell(1);
const findTableValueCell3 = findTableValueRow.insertCell(2);

findContainer.appendChild(findTable);

doc.body.appendChild(cont);
cont.appendChild(form);
cont.appendChild(table);

form.style.display = "flex";
form.style.flexWrap = "wrap";
const inputStyle =
  "display: block; margin-bottom: 20px; width: 300px; height: 30px; border-radius: 15px;";

form.appendChild(inputContainer);

inputContainer.appendChild(firstInt);
firstInt.placeholder = "ID";
firstInt.setAttribute("required", "true");
firstInt.setAttribute("pattern", "[0-9]{1,999}");
firstInt.style = inputStyle;

inputContainer.appendChild(secondInt);
secondInt.placeholder = "Pavadinimas";
secondInt.setAttribute("required", "true");
secondInt.style = inputStyle;

inputContainer.appendChild(thirdInt);
thirdInt.placeholder = "Kiekis";
thirdInt.setAttribute("required", "true");
thirdInt.setAttribute("pattern", "[0-9]{1,9999999999999}");
thirdInt.style = inputStyle;

const buttonContainer = doc.createElement("div");
buttonContainer.style.display = "flex";
buttonContainer.appendChild(insert);
buttonContainer.appendChild(edit);
buttonContainer.appendChild(del);
inputContainer.appendChild(buttonContainer);

form.appendChild(findContainer);

findContainer.appendChild(findInt);
findInt.placeholder = "Only numbers";
findInt.setAttribute("pattern", "[0-9]{1,9999999999999}");
findInt.style = `${inputStyle} height: 30px; margin-right: 10px;`;
findContainer.appendChild(find);
findContainer.appendChild(del);

insert.addEventListener("click", function (event) {
  event.preventDefault();

  const idValue = firstInt.value;
  const pavadinimasValue = secondInt.value;
  const kiekisValue = thirdInt.value;

  if (idValue && pavadinimasValue && kiekisValue) {
    if (isIdTaken(idValue)) {
      alert("ID is already taken. Please choose a different ID.");
    } else {
      const newItem = {
        id: idValue,
        pavadinimas: pavadinimasValue,
        kiekis: kiekisValue,
      };

      const existingItems = JSON.parse(localStorage.getItem("items")) || [];
      existingItems.push(newItem);
      localStorage.setItem("items", JSON.stringify(existingItems));

      firstInt.value = "";
      secondInt.value = "";
      thirdInt.value = "";

      alert("Item successfully inserted!");

      updateTable();
    }
  } else {
    alert("Please fill in all required fields.");
  }
});

edit.addEventListener("click", function (event) {
  event.preventDefault();

  const idToEdit = firstInt.value;
  const pavadinimasValue = secondInt.value;
  const kiekisValue = thirdInt.value;

  if (idToEdit && pavadinimasValue && kiekisValue) {
    editItemInLocalStorage(idToEdit, pavadinimasValue, kiekisValue);

    firstInt.value = "";
    secondInt.value = "";
    thirdInt.value = "";

    alert("Item successfully edited!");

    updateTable();
  } else {
    alert("Please fill in all required fields.");
  }
});

del.addEventListener("click", function (event) {
  event.preventDefault();

  const idToDelete = findInt.value;

  if (idToDelete) {
    deleteItemFromLocalStorage(idToDelete);
  } else {
    alert("Please enter an ID to delete.");
  }
});

find.addEventListener("click", function (event) {
  event.preventDefault();

  const idToSelect = findInt.value;

  if (idToSelect) {
    const selectedItem = getItemFromLocalStorage(idToSelect);

    if (selectedItem) {
      findTableValueCell1.textContent = "ID: " + selectedItem.id;
      findTableValueCell2.textContent =
        "Pavadinimas: " + selectedItem.pavadinimas;
      findTableValueCell3.textContent = "Kiekis: " + selectedItem.kiekis;

      findTable.style.display = "table";
    } else {
      alert("Item with the specified ID not found in local storage.");
    }
  } else {
    alert("Please enter an ID to select.");
  }
});

function updateTable() {
  const existingItems = JSON.parse(localStorage.getItem("items")) || [];

  table.innerHTML = "";

  const headerRow = table.insertRow(0);
  const headerCell1 = headerRow.insertCell(0);
  const headerCell2 = headerRow.insertCell(1);
  const headerCell3 = headerRow.insertCell(2);
  headerCell1.textContent = "ID";
  headerCell2.textContent = "Pavadinimas";
  headerCell3.textContent = "Kiekis";

  existingItems.forEach((item, index) => {
    const row = table.insertRow(index + 1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.textContent = item.id;
    cell2.textContent = item.pavadinimas;
    cell3.textContent = item.kiekis;
  });
}

function deleteItemFromLocalStorage(idToDelete) {
  let existingItems = JSON.parse(localStorage.getItem("items")) || [];

  const itemIndex = existingItems.findIndex((item) => item.id === idToDelete);

  if (itemIndex !== -1) {
    existingItems.splice(itemIndex, 1);

    localStorage.setItem("items", JSON.stringify(existingItems));

    updateTable();

    alert("Item successfully deleted!");
  } else {
    alert("Item with the specified ID not found in local storage.");
  }
}

function editItemInLocalStorage(idToEdit, newPavadinimas, newKiekis) {
  let existingItems = JSON.parse(localStorage.getItem("items")) || [];

  const itemIndex = existingItems.findIndex((item) => item.id === idToEdit);

  if (itemIndex !== -1) {
    existingItems[itemIndex].pavadinimas = newPavadinimas;
    existingItems[itemIndex].kiekis = newKiekis;

    localStorage.setItem("items", JSON.stringify(existingItems));

    updateTable();
  } else {
    alert("Item with the specified ID not found in local storage.");
  }
}

function getItemFromLocalStorage(idToSelect) {
  const existingItems = JSON.parse(localStorage.getItem("items")) || [];

  const selectedItem = existingItems.find((item) => item.id === idToSelect);

  return selectedItem;
}

function isIdTaken(id) {
  const existingItems = JSON.parse(localStorage.getItem("items")) || [];

  return existingItems.some((item) => item.id === id);
}
