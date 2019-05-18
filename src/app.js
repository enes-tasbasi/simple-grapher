const Graph = require("./index.js");

let inputElements = { 1: "" };

const panel = document.querySelector("div.inputs");

const newInputButton = document.querySelector("div.newInputButton");
newInputButton.addEventListener("click", addNewInput);

function handleInputError(e) {
  if (e != undefined) {
    const errorParagraph = document.getElementById(`e${Object.keys(e)[0]}`);
    const error = e[Object.keys(e)[0]];
    errorParagraph.innerText = error;
  } else {
    document
      .querySelectorAll(".errorParagraph")
      .forEach(p => (p.innerText = ""));
  }
}

let TheGraph = new Graph(document.querySelector("canvas"), {
  height: window.innerHeight - 20,
  width: 800,
  enableCoords: true
});

const constructInputs = (function(inputElements) {
  Object.keys(inputElements).forEach(number => {
    createInput(number);
  });
})(inputElements);

function createInput(id) {
  let newInput = document.createElement("input");
  newInput.id = id;
  newInput.type = "text";
  newInput.placeholder = "Type an Equation";

  TheGraph.bindInput(newInput, handleInputError);

  let newErrorParagraph = document.createElement("p");
  newErrorParagraph.id = `e${id}`;
  newErrorParagraph.className = "errorParagraph";

  let newSpan = document.createElement("span");

  let newDeleteButton = document.createElement("div");
  newDeleteButton.innerText = "X";
  newDeleteButton.id = `d${id}`;
  newDeleteButton.className = "inputDeleteButton";
  newDeleteButton.addEventListener("click", () =>
    deleteInput(newSpan, newInput)
  );

  newSpan.appendChild(newInput);
  newSpan.appendChild(newDeleteButton);
  newSpan.appendChild(newErrorParagraph);
  panel.appendChild(newSpan);
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
