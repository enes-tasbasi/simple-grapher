const Graph = require("./index.js");

let inputElements = { 1: "" };

const panel = document.querySelector("div.inputs");

const newInputButton = document.querySelector("div.newInputButton");
newInputButton.addEventListener("click", addNewInput);

function handleInputError(err) {
  if (err != undefined) {
    const errorParagraph = document.getElementById(`e${Object.keys(err)[0]}`);
    const error = err[Object.keys(err)[0]];
    errorParagraph.innerText = error;
  } else {
    document
      .querySelectorAll(".errorParagraph")
      .forEach(p => (p.innerText = ""));
  }
}

let TheGraph = new Graph(document.querySelector("canvas"), {
  // height: window.innerHeight - 40,
  // width: 800,
  enableCoords: true
});

const constructInputs = (function(inputElements) {
  Object.keys(inputElements).forEach(number => {
    createInput(number);
  });
})(inputElements);

function createInput(id) {
  let input = document.createElement("input");
  input.id = id;
  input.type = "text";
  input.placeholder = "Type an Equation";

  TheGraph.bindInput(input, handleInputError);

  let errorParagraph = document.createElement("p");
  errorParagraph.id = `e${id}`;
  errorParagraph.className = "errorParagraph";

  let span = document.createElement("span");

  let deleteButton = document.createElement("div");
  deleteButton.innerText = "X";
  deleteButton.id = `d${id}`;
  deleteButton.className = "inputDeleteButton";
  deleteButton.addEventListener("click", () => deleteInput(span, input));

  span.appendChild(input);
  span.appendChild(deleteButton);
  span.appendChild(errorParagraph);
  panel.appendChild(span);
}

function deleteInput(span, input) {
  TheGraph.inputRemoved(input);
  span.parentNode.removeChild(span);
}

function addNewInput() {
  const newId = parseInt(Object.keys(inputElements).slice(-1)[0]) + 1;
  createInput(newId);
  inputElements[newId] = "";
}
