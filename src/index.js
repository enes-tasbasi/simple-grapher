const mathjs = require("mathjs");
const parser = mathjs.parser();
const { disableBodyScroll } = require("body-scroll-lock");

const { trackCanvasMouse, drawBackground } = require("./utils");

// Disable scroll on mobile phones
const body = document.querySelector("body");
disableBodyScroll(body);

const canvas = document.querySelector("canvas");
const input = document.querySelector("input");
const button = document.querySelector("button");

canvas.width = 520;
canvas.height = 520;

let width = canvas.width;
let height = canvas.height;
let originX = canvas.width / 2;
let originY = canvas.height / 2;

button.addEventListener("click", parseInput);

canvas.addEventListener("mousemove", e => {
  trackCanvasMouse({ e, originX, originY });
});

let c = canvas.getContext("2d");

drawBackground(c, width, height);

let equString;

function parseInput() {
  equString = input.value;
  drawGraph(equString);
}

function drawGraph(equation = "x^2") {
  c.clearRect(0, 0, width, height);
  drawBackground(c, width, height);
  c.strokeStyle = "rgba(0, 0, 0, 0.9)";

  c.beginPath();
  for (let i = -50; i < 50; i++) {
    parser.set("x", i);
    draw(i, parser.eval(equation));
  }

  function draw(x, y) {
    let calculatedX = originX + x * 20;
    let calculatedY = originY + -y * 20;
    c.lineTo(calculatedX, calculatedY);
  }
  c.stroke();
  c.closePath();
}

drawGraph();
