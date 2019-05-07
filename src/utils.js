let coordinates = document.querySelector(".coordinates");

let timeout;
const trackCanvasMouse = (e, originX, originY) => {
  let x = e.offsetX;
  let y = e.offsetY;
  let calculatedX = (x - originX) / 20;
  let calculatedY = (originY + -y) / 20;
  coordinates.innerText = `${calculatedX.toFixed(0)}, ${calculatedY.toFixed(
    0
  )}`;
  coordinates.style.left = `${x}px`;
  coordinates.style.top = `${y}px`;

  coordinates.style.display = "inline";

  //
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(function() {
    coordinates.style.display = "none";
  }, 1000);
};

const drawBackground = (c, width, height) => {
  for (let i = 0; i < width; i++) {
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
