const Graph = require("./index.js");

const inputElements = { 1: "" };

const inputs = document.querySelector("div.inputs");

const newInputButton = document.querySelector("div.newInputButton");
newInputButton.addEventListener("click", addNewInput);

let inputsArray = [];

const TheGraph = new Graph(document.querySelector("canvas"));

const bindInput = (element) => {
    inputsArray = [...inputsArray, element];
    element.addEventListener("input", inputEventListener);
};

async function draw(inputId, equation) {
    if (equation === "") {
        cleanError(inputId);
        adjustCanvasSize();
    } else {
        // let equationHasError = false;
        // TheGraph.drawGraph(equation)
        //     .then(() => cleanError(inputId))
        //     .catch((err) => handleInputError(inputId, err));

        TheGraph.drawGraph(["x", "-", "-x"])
            .then(() => cleanError(inputId))
            .catch((err) => console.log(err));
    }
}

function inputEventListener(e) {
    inputElements[e.target.id] = e.target.value;
    draw(e.target.id, e.target.value);
}

function removeInputListener(elem) {
    elem.removeEventListener("input", inputEventListener);
    delete inputElements[elem.id];
    // remove the input from the inputs array and rerender the input valuse
    inputsArray = inputsArray.filter((input) => input !== elem);
    inputsArray.forEach((input) => draw(elem.id, input.value));
}

function handleInputError(inputId, errMessage) {
    const errorParagraph = document.getElementById(`e${inputId}`);

    if (errorParagraph) errorParagraph.innerText = errMessage;
}

function cleanError(inputId) {
    document.getElementById(`e${inputId}`).innerText = "";
}
const constructInputs = (() => {
    Object.keys(inputElements).forEach((number) => {
        createInput(number);
    });
})();

function createInput(id) {
    const input = document.createElement("input");
    input.id = id;
    input.type = "text";
    input.placeholder = "Type an Equation";

    bindInput(input, handleInputError);

    const errorParagraph = document.createElement("p");
    errorParagraph.id = `e${id}`;
    errorParagraph.className = "errorParagraph";

    const span = document.createElement("span");

    const deleteButton = document.createElement("div");
    deleteButton.innerText = "X";
    deleteButton.id = `d${id}`;
    deleteButton.className = "inputDeleteButton";
    deleteButton.addEventListener("click", () => deleteInput(span, input));

    span.appendChild(input);
    span.appendChild(deleteButton);
    span.appendChild(errorParagraph);
    inputs.appendChild(span);
}

function deleteInput(span, input) {
    delete inputElements[input.id];
    removeInputListener(input);
    span.parentNode.removeChild(span);
}

function checkIfInputElementsIsEmpty() {
    return Object.keys(inputElements).length === 0;
}

function getLastItem(array) {
    return parseInt(array.slice(-1)[0], 10);
}

function addNewInput() {
    // if the input elements object is empty, the new input will have an id of 1
    const newId = checkIfInputElementsIsEmpty() ? 1 : getLastItem(Object.keys(inputElements)) + 1;
    createInput(newId);
    inputElements[newId] = "";
}

function adjustCanvasSize() {
    const setCanvasSize = () => {
        // Adjust the canvas' width and height so that the canvas doesn't overflows
        let canvasHeight = window.innerHeight - 20;
        let canvasWidth = window.innerWidth - 300;
        if (canvasWidth > window.innerHeight - 20) {
            canvasWidth = window.innerHeight - 20;
        } else if (canvasHeight > window.innerWidth - 300) {
            canvasHeight = window.innerWidth - 300;
        }

        if (window.innerWidth >= 500) {
            TheGraph.changeCanvasSize(canvasWidth, canvasHeight);
        } else {
            TheGraph.changeCanvasSize(520, 520);
        }
    };

    window.addEventListener("resize", setCanvasSize);

    setCanvasSize();
}
adjustCanvasSize();

// disable body scroll in mobile devices
(function disableScroll() {
    document.body.addEventListener("touchmove", (e) => e.preventDefault(), {
        passive: false,
    });
}());

const panel = document.querySelector("div.panel");

let isClicked = false;
let savedHeight = 50;

/*  listen for window resize events to make sure the side panel
 covers 100vh of height when the window width is larger than 500px */
window.addEventListener("resize", () => {
    if (window.innerWidth > 500) {
        panel.style.height = "100vh";
    } else {
        panel.style.height = `${savedHeight}vh`;
    }
});

document.querySelector("div.slider").addEventListener("mousedown", downEvent);
document.querySelector("div.slider").addEventListener("touchstart", downEvent);

document.querySelector("div.slider").addEventListener("mouseup", upEvent);
document.querySelector("div.slider").addEventListener("touchend", upEvent);

window.addEventListener("mousemove", moveEvent);
window.addEventListener("touchmove", touchMoveEvent);

function downEvent() {
    isClicked = true;
}

function upEvent() {
    isClicked = false;
}

function moveEvent(e) {
    if (isClicked) {
        // calculate the % the cursor is compared to height of the window
        const height = 101 - (e.pageY / window.innerHeight) * 100;
        panel.style.height = `${height}vh`;
        savedHeight = height;
    }
}

function touchMoveEvent(e) {
    if (isClicked) {
        // calculate the % the cursor is compared to window.innerHeight
        const height = 112 - (e.touches[0].pageY / window.innerHeight) * 100;
        panel.style.height = `${height}vh`;
        savedHeight = height;
    }
}
