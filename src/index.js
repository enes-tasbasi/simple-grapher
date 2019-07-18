const mathjs = require("mathjs");

const parser = mathjs.parser();

const { trackCanvasMouse, drawBackground } = require("./utils");

function Graph(canvas, options) {
    // Set the default options, if the user has not passed them to the func.
    options = Object.assign(
        {
            width: 520,
            height: 520,
            enableCoords: true,
        },
        options,
    );
    let { width, height, enableCoords } = options;

    canvas.width = width;
    canvas.height = height;

    // get the origin (0, 0), the center of the canvas
    let originX = canvas.width / 2;
    let originY = canvas.height / 2;

    // Get 2d context and draw the background
    const c = canvas.getContext("2d");
    drawBackground(c, width, height);

    const equations = [];

    function drawGraph(equation) {
        let returnVal;

        // clear the canvas and draw the lines again
        c.clearRect(0, 0, width, height);
        drawBackground(c, width, height);

        if (!Array.isArray(equation)) {
            returnVal = calcAndDraw(equation);
        } else {
            const errors = [];

            Promise.all(
                equation.map(
                    (eachEquation) =>
                        new Promise((resolve, reject) => {
                            calcAndDraw(eachEquation)
                                .then(() => resolve())
                                .catch((err) => reject(err));
                        }),
                ),
            )
                .then((e) => console.log("No errors", e))
                .catch((err) => console.log(err));

            console.log(errors);
            // if (errors.length > 0) {
            //     returnVal = Promise.reject(errors);
            // } else {
            //     returnVal = Promise.resolve();
            // }
        }

        return returnVal;

        function calcAndDraw(equation) {
            return Promise.resolve().then(
                () =>
                    new Promise((resolve, reject) => {
                        function calculate(equation) {
                            if (equation === "") return;

                            try {
                                testEquation(equation);
                            } catch (err) {
                                reject(err.message);
                            }

                            c.strokeStyle = "rgba(240, 40, 40, 0.9)";
                            c.beginPath();

                            for (let x = -60; x < 60; x += 0.05) {
                                parser.set("x", x);
                                let y;
                                try {
                                    y = parser.eval(equation);
                                } catch (e) {
                                    reject(e.message);
                                }

                                if (typeof y !== "number") return;

                                // Reduce the coordds to only 2 decimals and get the calculated coordinates
                                const calculatedCoords = calcCoords(x.toFixed(2), y.toFixed(2));

                                draw(calculatedCoords.x, calculatedCoords.y);
                            }
                            c.stroke();
                            c.closePath();
                            resolve();
                        }

                        calculate(equation);

                        function calcCoords(x, y) {
                            const calculatedX = originX + x * 20;
                            const calculatedY = originY + -y * 20;
                            return { x: calculatedX, y: calculatedY };
                        }

                        function getRandomColor() {
                            return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
                                Math.random() * 255,
                            )}, ${Math.floor(Math.random() * 255)})`;
                        }

                        function draw(x, y) {
                            // c.strokeStyle = getRandomColor();
                            c.lineCap = "round";
                            c.lineWidth = 2;
                            c.lineTo(x, y);
                        }
                    }),
            );
        }
    }

    if (enableCoords) {
        canvas.addEventListener("mousemove", (e) => {
            trackCanvasMouse(e, canvas, originX, originY);
        });
    }

    function testEquation(equation) {
        parser.set("x", Math.round(Math.random() * 100));
        const evalValue = parser.eval(equation);

        // We have to check if the parser.eval() returns and object. If it does than throw an error
        if (typeof evalValue === "object") {
            throw new Error(`Unable to parse ${equation}`);
        }
        return evalValue;
    }

    function setOrigin(newWidth, newHeight) {
        originX = newWidth / 2;
        originY = newHeight / 2;
    }

    function changeCanvasSize(newWidth, newHeight) {
        width = newWidth;
        height = newHeight;

        canvas.width = newWidth;
        canvas.height = newHeight;

        setOrigin(newWidth, newHeight);
        drawBackground(c, width, height);
    }

    function clearGraph() {
        drawBackground(c, width, height);
    }

    return {
        drawGraph,
        changeCanvasSize,
        clearGraph,
    };
}

module.exports = Graph;
