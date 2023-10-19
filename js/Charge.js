import Vector from "./Vector.js";

export default class Charge {
  constructor(charge, x, y, colour) {
    this.charge = charge;
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.position = new Vector(x, y);
    this.colour = colour || '#000000';
  }

  V(x, y) {
    var dx = this.x - x;
    var dy = this.y - y;
    var r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    var V = this.charge / r;
    return V;
  }

  E(x, y) {
    var dx = this.x - x;
    var dy = this.y - y;
    var r = Math.hypot(dx, dy);
    var E = this.charge / (r * r);
    var Ex = (E * -dx) / r;
    var Ey = (E * -dy) / r;
    var E = new Vector(Ex, Ey);
    return E;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.colour;
    console.log("set pen colour to draw charge" + this.colour);
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
  }
}
