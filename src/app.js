const Graph = require("./index.js");

new Graph(document.querySelector("canvas"), {
  height: 291,
  width: 231,
  enableCoords: true
}).bindInputs(document.querySelectorAll("input"), e => {
  if (e != undefined) {
    const errorParagraph = document.getElementById(`e${Object.keys(e)[0]}`);
    const error = e[Object.keys(e)[0]];
    errorParagraph.innerText = error;
  } else {
    document
      .querySelectorAll(".errorParagraph")
      .forEach(p => (p.innerText = ""));
  }
});
