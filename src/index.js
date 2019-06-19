const mathjs = require("mathjs");
const parser = mathjs.parser();

const { trackCanvasMouse, drawBackground } = require("./utils");

function Graph(canvas, options) {
    let width, height, enableCoords;

    if (options) {
        width = options.width;
        height = options.height;
        enableCoords = options.enableCoords;
    }

    // Set the default options, if the user has not passed them to the func.
    width = width || 520;
    height = height || 520;
    if (enableCoords == undefined) enableCoords = true;

    canvas.width = width;
    canvas.height = height;

    // get the origin (0, 0)
    let originX = canvas.width / 2;
    let originY = canvas.height / 2;

    // Get 2d context and draw the background
    let c = canvas.getContext("2d");
    drawBackground(c, width, height);

    // Stores the previous equations. Its purpose is to prevent the device to make the same calculations
    // multiple times as it will take more CPU power.
    globalThis.equationHistory = globalThis.equationHistory || {};

    function drawGraph(equation, errCallback) {
        // clear the canvas and draw the lines again
        c.clearRect(0, 0, width, height);
        drawBackground(c, width, height);

        return new Promise((resolve, reject) => {
            if (typeof equation == "string") {
                calculate(equation);
            } else if (typeof equation == "object") {
                equation.forEach(equation => calculate(equation));
            }

            // if equation is single string calculate once, if it is an array loop throught to calculate all of them

            function calculate(equation) {
                if (equation == "") return;

                try {
                    testEquation(equation);
                } catch (err) {
                    // return errCallback(err.message);
                    reject(err.message);
                }

                c.strokeStyle = `rgba(240, 40, 40, 0.9)`;
                c.beginPath();
                if (
                    !Object.keys(globalThis.equationHistory).includes(equation)
                ) {
                    let coordsForEquation = [];

                    for (let x = -60; x < 60; x = x + 0.05) {
                        parser.set("x", x);
                        let y;
                        try {
                            y = parser.eval(equation);
                        } catch (e) {
                            return reject(e.message);
                        }

                        if (typeof y != "number") return;

                        // Reduce the coordds to only 2 decimals and get the calculated coordinates
                        let calculatedCoords = calcCoords(
                            x.toFixed(2),
                            y.toFixed(2)
                        );

                        draw(calculatedCoords.x, calculatedCoords.y);

                        // Add the calculated coordinates to an array to pass it to the equationHistory object
                        coordsForEquation = [
                            ...coordsForEquation,
                            { x: calculatedCoords.x, y: calculatedCoords.y }
                        ];
                    }
                    globalThis.equationHistory[equation] = coordsForEquation;
                } else {
                    // get the current equation from the equation history, so we don't have to process the same thing twice.
                    let revivedEquation = globalThis.equationHistory[equation];
                    for (let i = 0; i < revivedEquation.length; i++) {
                        draw(revivedEquation[i].x, revivedEquation[i].y);
                    }
                }
                c.stroke();
                c.closePath();
            }
        });

        function calcCoords(x, y) {
            let calculatedX = originX + x * 20;
            let calculatedY = originY + -y * 20;
            return { x: calculatedX, y: calculatedY };
        }

        function getRandomColor() {
            return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)})`;
        }

        function draw(x, y) {
            c.strokeStyle = getRandomColor();
            c.lineCap = "round";
            c.lineWidth = 2;
            c.lineTo(x, y);
        }
    }

    if (enableCoords) {
        canvas.addEventListener("mousemove", e => {
            trackCanvasMouse(e, canvas, originX, originY);
        });
    }

    let inputs = [];

    const bindInput = function(element, errCallback) {
        inputs = [...inputs, element];
        element.addEventListener("input", e =>
            inputEventListener(e, errCallback)
        );
    };

    const bindInputs = function(elements, errCallback) {
        inputs = [...inputs, ...elements];

        elements.forEach(element => {
            element.addEventListener("input", e =>
                inputEventListener(e, errCallback)
            );
        });
    };

    // Carries each input's id and its value
    let elementValues = {};

    function testEquation(equation) {
        parser.set("x", Math.round(Math.random() * 100));
        let evalValue = parser.eval(equation);

        // We have to check if the parser.eval() returns and object. If it does than throw an error
        if (typeof evalValue == "object") {
            throw new Error(`Unable to parse ${equation}`);
        }
        return evalValue;
    }

    // TODO: fix the rendering of some functions

    async function inputEventListener(e, errCallback = function() {}) {
        elementValues[e.target.id] = e.target.value;

        // Test the inputed equation, if there is an error throw an error.
        let equationIsDrawable = true;
        try {
            testEquation(e.target.value);
        } catch (err) {
            equationIsDrawable = false;

            if (errCallback) {
                return errCallback({ [e.target.id]: err.message });
            }
        }

        errCallback(undefined);

        if (equationIsDrawable) {
            try {
                // Get all the values from the input elements and pass to drawGraph as an array
                await drawGraph(
                    Object.keys(elementValues).map(key => elementValues[key])
                );
            } catch (err) {
                errCallback(err);
            }
        }
        c.beginPath();
    }

    function inputRemoved(elem) {
        elem.removeEventListener("input", inputEventListener);
        delete elementValues[elem.id];
        // remove the input from the inputs array and rerender the input valuse
        inputs = inputs.filter(input => input != elem);
        let inputVals = inputs.map(input => input.value);
        drawGraph(inputVals);
    }

    return {
        drawGraph,
        bindInput,
        bindInputs,
        inputRemoved
    };
}

module.exports = Graph;
