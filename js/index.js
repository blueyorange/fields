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

// set up svg
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", config.width);
svg.setAttribute("height", config.height);

document.getElementById(config.appId).appendChild(svg);

// initiate field
const field = new Field();
let currCharge = 1;

// toggle plus to minus charge
document
  .getElementById("charge-toggle")
  .addEventListener("change", function () {
    currCharge = currCharge * -1;
    console.log(currCharge);
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
  svg.innerHTML = "";
  field.fieldLines().map(createBezierPath);
}

function drawLine(points) {
  const { x, y } = points.shift();
  ctx.beginPath();
  ctx.moveTo(x, y);
  points.forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.lineWidth = config.strokeWidth;
  ctx.stroke();
}

async function createBezierPath(points) {
  console.log("in createBezierPath");
  console.log(points.length);
  const numPoints = 20;
  const reducedPoints = filterEquallySpaced(points, numPoints);
  console.log(reducedPoints, reducedPoints.length);
  const bezierCurve = new Bezier(reducedPoints);
  console.log("created bezier");
  const lut = bezierCurve.getLUT(100); // Adjust the number of points as needed

  const pathData =
    `M${points[0].x},${points[0].y}` +
    lut.map((point) => `L${point.x},${point.y}`).join("");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "black");
  path.setAttribute("stroke-width", config.strokeWidth);
  path.setAttribute("fill", "none");
  svg.appendChild(path);
}

function filterEquallySpaced(arr, numEntries) {
  if (numEntries <= 0) {
    return [];
  }

  if (numEntries >= arr.length) {
    return arr.slice(); // Return a shallow copy of the original array
  }

  const result = [];
  const step = (arr.length - 1) / (numEntries - 1);

  for (let i = 0; i < numEntries; i++) {
    const index = Math.round(i * step);
    result.push(arr[index]);
  }

  return result;
}
