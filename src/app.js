const Graph = require("./index.js");

let inputElements = { 1: "" };

const inputs = document.querySelector("div.inputs");

const newInputButton = document.querySelector("div.newInputButton");
newInputButton.addEventListener("click", addNewInput);

function handleInputError(err) {
    if (err != undefined) {
        const errorParagraph = document.getElementById(
            `e${Object.keys(err)[0]}`
        );
        const error = err[Object.keys(err)[0]];
        errorParagraph.innerText = error;
    } else {
        document
            .querySelectorAll(".errorParagraph")
            .forEach(p => (p.innerText = ""));
    }
}

let TheGraph = new Graph(document.querySelector("canvas"), {
    enableCoords: false
});

adjustCanvasSize();

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
    inputs.appendChild(span);
}

function deleteInput(span, input) {
    delete inputElements[input.id];
    TheGraph.removeInputListener(input);
    span.parentNode.removeChild(span);
}

function addNewInput() {
    const newId = parseInt(Object.keys(inputElements).slice(-1)[0]) + 1;
    createInput(newId);
    inputElements[newId] = "";
}

function adjustCanvasSize() {
    function setCanvasSize() {
        // * Adjust the canvas' width and height so that the canvas doesn't overflows
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
    }

    window.addEventListener("resize", setCanvasSize);

    setCanvasSize();
}

let panel = document.querySelector("div.panel");

let isClicked = false;
let savedHeight = 50;

// * listen for window resize events to make sure the side panel covers 100vh of height when the window width is
// * larger than 500px
window.addEventListener("resize", function() {
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
        // calculate the % the cursor is compared to window.innerHeight
        let height = 112.5 - (e.screenY / window.innerHeight) * 100;
        panel.style.height = `${height}vh`;
        savedHeight = height;
    }
}

function touchMoveEvent(e) {
    if (isClicked) {
        // calculate the % the cursor is compared to window.innerHeight
        let height = 112 - (e.touches[0].screenY / window.innerHeight) * 100;
        panel.style.height = `${height}vh`;
        savedHeight = height;
    }
}
