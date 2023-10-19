import Charge from './Charge.js';
import drawFieldLinesFromOneCharge from './drawFieldLinesFromOneCharge.js'
import config from './config.js'

//set up the canvas and context
const canvas = document.createElement('canvas');
canvas.width = config.width;
canvas.height = config.height;
document.getElementById(config.appId).appendChild(canvas);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(1,1,1,1)";

// array to store charges
const charges = [];

//report the mouse position on click
canvas.addEventListener(
  "click",
  function (evt) {
    const {x,y} = getMousePos(canvas, evt);
      const charge = new Charge(1, x, y);
      charge.draw(ctx);
      charges.push(charge);
      
      update(charges, ctx);
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

function update(charges, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    charges.forEach(charge => drawFieldLinesFromOneCharge(charge, charges, ctx))
}