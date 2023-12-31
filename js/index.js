import { Bezier } from "https://cdn.jsdelivr.net/npm/bezier-js@6.1.4/src/bezier.min.js";
import Charge from "./Charge.js";
import Field from "./Field.js";
import config from "./config.js";

//set up the canvas and context
const canvas = document.createElement("canvas");
canvas.width = config.width;
canvas.height = config.height;
document.getElementById(config.appId).appendChild(canvas);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(1,1,1,1)";
ctx.imageSmoothingEnabled = false;
ctx.lineCap = "round";

// initiate field
const field = new Field();
let currCharge = 1;

// toggle plus to minus charge
document
  .getElementById("charge-toggle")
  .addEventListener("change", function () {
    currCharge = currCharge * -1;
  });

//report the mouse position on click
canvas.addEventListener(
  "click",
  function (evt) {
    const { x, y } = getMousePos(canvas, evt);
    const charge = new Charge(currCharge, x, y);
    field.charges.push(charge);
    update(field, ctx);
  },
  false
);

//Get Mouse Position
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function update(field, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  field.fieldLines().forEach(drawLine);
}

function drawLine(points) {
  const { x, y } = points.shift();
  ctx.beginPath();
  ctx.moveTo(x, y);
  points.forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.lineWidth = config.strokeWidth;
  ctx.stroke();
}
