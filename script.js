const doc = document;
const cont = doc.createElement("div");
const form = doc.createElement("form");
const firstInt = doc.createElement("input");
const secondInt = doc.createElement("input");
const thirdInt = doc.createElement("input");
const sub = doc.createElement("button");

sub.textContent = "submit";
sub.setAttribute("type", "submit");

doc.body.appendChild(cont);
cont.appendChild(form);

form.appendChild(firstInt);
firstInt.placeholder = "ID";

form.appendChild(secondInt);
secondInt.placeholder = "Pavadinimas";

form.appendChild(thirdInt);
thirdInt.placeholder = "Kiekis";

form.appendChild(sub);

firstInt.setAttribute("required", "true");
firstInt.setAttribute("pattern", "[0-9]{1,999}");

secondInt.setAttribute("required", "true");

thirdInt.setAttribute("required", "true");
thirdInt.setAttribute("pattern", "[0-9]{1,9999999999999}");

//
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Check if the form is valid
  if (form.checkValidity()) {
    // paima ivestas reiksmes
    const idValue = firstInt.value;
    const pavadinimasValue = secondInt.value;
    const kiekisValue = thirdInt.value;

    // Sukuria obijekta saugojimui i localstorage
    const formData = {
      id: idValue,
      pavadinimas: pavadinimasValue,
      kiekis: kiekisValue,
    };

    // obijekta paverciam i JSON string ir isaugom localstorage
    localStorage.setItem("formData", JSON.stringify(formData));

    // resetina forma
    form.reset();
  }
});
