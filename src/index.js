const mathjs = require("mathjs");
const parser = mathjs.parser();
const { disableBodyScroll } = require("body-scroll-lock");

const { trackCanvasMouse, drawBackground } = require("./utils");

// Disable scroll on mobile phones
const body = document.querySelector("body");
disableBodyScroll(body);

module.exports = function Graph(
  canvas,
  options = { width: 520, height: 520, enableCoords: true }
) {
  let { width, height, enableCoords } = options;
  width = width || 520;
  height = height || 520;
  if (enableCoords == undefined) enableCoords = true;
  this.canvas = canvas;
  this.canvas.width = width;
  this.canvas.height = height;
  let originX = this.canvas.width / 2;
  let originY = this.canvas.height / 2;
  let c = this.canvas.getContext("2d");

  drawBackground(c, width, height);

  let equationHistory = {};

  this.drawGraph = function(equation) {
    c.clearRect(0, 0, width, height);
    drawBackground(c, width, height);

    const getRandomColor = () => {
      return Math.floor(Math.random() * 250);
    };

    // if equation is single string calculate once, if it is an array loop throught to calculate all of them
    if (typeof equation == "string") {
      calculate(equation);
    } else if (typeof equation == "object") {
      equation.forEach(equation => calculate(equation));
    }

    function calculate(equation) {
      if (equation == "") return;

      c.strokeStyle = `rgba(240, 40, 40, 0.9)`;

      if (!Object.keys(equationHistory).includes(equation)) {
        let coordsForEquation = [];

        c.beginPath();
        for (let x = -60; x < 60; x = x + 0.1) {
          parser.set("x", x);
          let y;
          try {
            y = parser.eval(equation);
          } catch (e) {
            return;
          }

          if (typeof y != "number") return;
          let coords = draw(x.toFixed(2), y.toFixed(2));
          coordsForEquation = [...coordsForEquation, coords];
        }
        equationHistory[equation] = coordsForEquation;
      } else {
        c.beginPath();

        // get the current equation from the equation history, so we don't have to process the same thing twice.
        let revivedEquation = equationHistory[equation];
        for (let i = 0; i < revivedEquation.length; i++) {
          draw(revivedEquation[i].x, revivedEquation[i].y);
        }
      }
    }

    function draw(x, y) {
      let calculatedX = originX + x * 20;
      let calculatedY = originY + -y * 20;

      c.lineWidth = 0.1;
      c.lineTo(calculatedX, calculatedY);
      c.stroke();

      return { x, y };
    }

    c.closePath();
  };

  if (enableCoords) {
    this.canvas.addEventListener("mousemove", e => {
      trackCanvasMouse(e, canvas, originX, originY);
    });
  }

  let inputs = [];

  this.bindInput = function(element, errCallback) {
    inputs = [...inputs, element];
    element.addEventListener("input", e =>
      this.inputEventListener(e, element, errCallback)
    );
  };

  this.bindInputs = function(elements, errCallback) {
    inputs = [...inputs, ...elements];

    elements.forEach(element => {
      element.addEventListener("input", e =>
        this.inputEventListener(e, element, errCallback)
      );
    });
  };

  // Carries each input's id and its value
  let elementInputs = {};

  // TODO: fix the rendering of wrong functions

  this.inputEventListener = function(e, element, errCallback) {
    elementInputs[e.target.id] = e.target.value;

    const testEquation = equation => {
      parser.set("x", Math.round(Math.random() * 100));
      let evalValue = parser.eval(equation);
      if (typeof evalValue == "object") {
        throw new Error(`Unable to parse ${equation}`);
      }
      return evalValue;
    };

    let equationsIsDrawable = true;
    try {
      testEquation(e.target.value);
    } catch (err) {
      equationsIsDrawable = false;
      return errCallback({ [element.id]: err });
    }
    errCallback(undefined);

    if (equationsIsDrawable) {
      let equationsToDraw = this.drawGraph(
        Object.keys(elementInputs).map(key => elementInputs[key])
      );
    }
    c.beginPath();
  };

  this.inputRemoved = function(elem) {
    // remove the input from the inputs array and rerender the input valuse
    inputs = inputs.filter(input => input != elem);
    let inputVals = inputs.map(input => input.value);
    this.drawGraph(inputVals);
  };
};
