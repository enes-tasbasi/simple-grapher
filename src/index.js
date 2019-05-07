const mathjs = require("mathjs");
const parser = mathjs.parser();
const { disableBodyScroll } = require("body-scroll-lock");

const { trackCanvasMouse, drawBackground } = require("./utils");

// Disable scroll on mobile phones
const body = document.querySelector("body");
disableBodyScroll(body);

function Graph(
  canvas,
  options = { width: 520, height: 520, enableCoords: true }
) {
  let { width, height, enableCoords } = options;

  this.canvas = canvas;
  this.canvas.width = width ? width : 520;
  this.canvas.height = height ? height : 520;
  let originX = this.canvas.width / 2;
  let originY = this.canvas.height / 2;
  let c = this.canvas.getContext("2d");

  drawBackground(c, width, height);

  this.drawGraph = function(equation = "x^2") {
    c.clearRect(0, 0, width, height);
    drawBackground(c, width, height);
    c.strokeStyle = "rgba(0, 0, 0, 0.9)";

    c.beginPath();
    for (let i = -20; i < 20; i = i + 0.1) {
      parser.set("x", i);
      let y;
      try {
        y = parser.eval(equation);
      } catch (e) {
        console.log(e);
      }
      draw(i, y);
    }

    function draw(x, y) {
      let calculatedX = originX + x * 20;
      let calculatedY = originY + -y * 20;
      c.lineTo(calculatedX, calculatedY);
    }
    c.stroke();
    c.closePath();
  };

  this.drawGraph();

  if (enableCoords) {
    this.canvas.addEventListener("mousemove", e => {
      trackCanvasMouse(e, originX, originY);
    });
  }
}

new Graph(document.querySelector("canvas"));

// const canvas = document.querySelector("canvas");
// const input = document.querySelector("input");

// canvas.width = 520;
// canvas.height = 520;

// let width = canvas.width;
// let height = canvas.height;
// let originX = canvas.width / 2;
// let originY = canvas.height / 2;

// input.addEventListener("input", parseInput);

// canvas.addEventListener("mousemove", e => {
//   trackCanvasMouse({ e, originX, originY });
// });

// let c = canvas.getContext("2d");

// drawBackground(c, width, height);

// let equString;

// function parseInput() {
//   equString = input.value;
//   drawGraph(equString);
// }

// function drawGraph(equation = "x^2") {
//   c.clearRect(0, 0, width, height);
//   drawBackground(c, width, height);
//   c.strokeStyle = "rgba(0, 0, 0, 0.9)";

//   c.beginPath();
//   for (let i = -20; i < 20; i = i + 0.1) {
//     parser.set("x", i);
//     let y;
//     try {
//       y = parser.eval(equation);
//     } catch (e) {
//       console.log(e);
//     }
//     draw(i, y);
//   }

//   function draw(x, y) {
//     let calculatedX = originX + x * 20;
//     let calculatedY = originY + -y * 20;
//     c.lineTo(calculatedX, calculatedY);
//   }
//   c.stroke();
//   c.closePath();
// }

// drawGraph();
