// let coordinates = document.querySelector(".coordinates");
let coordinates = document.createElement("div");
coordinates.className = "coordinates";

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
  for (let i = 0; i < width; i++) {
    c.lineWidth = 1;
    c.strokeStyle = "rgba(0,0,0,0.3)";
    if (i % (width / 2) == 0) {
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

  for (let a = 0; a < height; a++) {
    c.strokeStyle = "rgba(0,0,0,0.3)";
    if (a % (height / 2) == 0) {
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
};

module.exports = { trackCanvasMouse, drawBackground };
