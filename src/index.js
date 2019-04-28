const mathjs = require("mathjs");
const parser = mathjs.parser();

const canvas = document.querySelector("canvas");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", parseInput);

canvas.width = 800;
canvas.height = 600;

let c = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;
let originX = canvas.width / 2;
let originY = canvas.height / 2;

function drawBackground() {
  for (let i = 0; i < 680; i++) {
    c.strokeStyle = "rgba(0,0,0,0.3)";
    if (i % 300 == 0) {
      c.strokeStyle = "rgba(0, 0, 0, 0.8)";
    }
    if (i % 20 == 0) {
      c.beginPath();
      c.moveTo(0, i);
      c.lineTo(width, i);
      c.stroke();
      c.closePath();
    }
  }

  for (let a = 0; a < 800; a++) {
    c.strokeStyle = "rgba(0,0,0,0.3)";
    if (a % 400 == 0) {
      c.strokeStyle = "rgba(0, 0, 0, 0.8)";
    }
    if (a % 20 == 0) {
      c.beginPath();
      c.moveTo(a, 0);
      c.lineTo(a, height);
      c.stroke();
      c.closePath();
    }
  }
}

drawBackground();

let equString;
let parsedEqu;

function parseInput() {
  equString = input.value;
  drawGraph(equString);
}

function drawGraph(equation = "x^2") {
  c.clearRect(0, 0, width, height);
  drawBackground();
  c.strokeStyle = "rgba(0, 0, 0, 0.9)";

  c.beginPath();
  for (let i = -50; i < 50; i++) {
    parser.set("x", i);
    draw(i, parser.eval(equation));
    console.log("Evaluated " + i + " " + parser.eval(equation));
  }

  function draw(x, y) {
    let calculatedX = originX + x;
    let calculatedY = originY + -y;
    console.log("Calculated " + calculatedX + " " + calculatedY);
    c.lineTo(calculatedX, calculatedY);
  }
  c.stroke();
  c.closePath();
}

drawGraph();
