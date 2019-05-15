let coordinates = document.createElement("div");

Object.assign(coordinates.style, {
  "z-index": -1,
  position: "absolute",
  height: "40px",
  width: "fit-content",
  "background-color": "rgba(20, 20, 20, 0.3)",
  "border-radius": "10px",
  display: "none",
  "text-align": "center",
  padding: "12px",
  "box-sizing": "border-box",
  "font-size": "1em",
  display: "none"
});

let timeout;
const trackCanvasMouse = (e, canvas, originX, originY) => {
  canvas.parentNode.insertBefore(coordinates, canvas.nextSibling);
  let coordsX = e.clientX;
  let coordsY = e.clientY;
  let x = e.offsetX;
  let y = e.offsetY;
  let calculatedX = (x - originX) / 20;
  let calculatedY = (originY + -y) / 20;
  coordinates.innerText = `${calculatedX.toFixed(0)}, ${calculatedY.toFixed(
    0
  )}`;
  coordinates.style.left = `${coordsX}px`;
  coordinates.style.top = `${coordsY}px`;

  coordinates.style.display = "inline";

  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(function() {
    coordinates.style.display = "none";
  }, 1000);
};

const drawBackground = (c, width, height) => {
  c.lineWidth = 1;

  c.strokeStyle = "rgba(0, 0, 0, 0.8)";
  c.beginPath();
  c.moveTo(0, height / 2);
  c.lineTo(width, height / 2);
  c.stroke();
  c.closePath();

  // draw horizontal lines
  let horLineCount = 0;
  for (let i = height / 2; i > 0; i--) {
    c.strokeStyle = "rgba(0,0,0,0.3)";

    horLineCount++;
    if (horLineCount == 20) {
      c.beginPath();
      c.moveTo(0, i);
      c.lineTo(width, i);
      c.stroke();
      c.closePath();
      horLineCount = 0;
    }
  }

  horLineCount = 0;
  for (let i = height / 2; i < height; i++) {
    c.strokeStyle = "rgba(0,0,0,0.3)";

    horLineCount++;
    if (horLineCount == 20) {
      c.beginPath();
      c.moveTo(0, i);
      c.lineTo(width, i);
      c.stroke();
      c.closePath();
      horLineCount = 0;
    }
  }

  c.strokeStyle = "rgba(0, 0, 0, 0.8)";
  c.beginPath();
  c.moveTo(width / 2, 0);
  c.lineTo(width / 2, height);
  c.stroke();
  c.closePath();

  let verLineCount = 0;
  // draw vertical lines
  for (let a = width / 2; a > 0; a--) {
    c.strokeStyle = "rgba(0,0,0,0.3)";
    verLineCount++;
    if (verLineCount == 20) {
      c.beginPath();
      c.moveTo(a, 0);
      c.lineTo(a, height);
      c.stroke();
      c.closePath();
      verLineCount = 0;
    }
  }

  verLineCount = 0;
  // draw vertical lines
  for (let a = width / 2; a < width; a++) {
    c.strokeStyle = "rgba(0,0,0,0.3)";
    verLineCount++;
    if (verLineCount == 20) {
      c.beginPath();
      c.moveTo(a, 0);
      c.lineTo(a, height);
      c.stroke();
      c.closePath();
      verLineCount = 0;
    }
  }
};

module.exports = { trackCanvasMouse, drawBackground };
