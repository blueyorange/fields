import Vector from "./Vector.js";

export default class Charge {
  constructor(charge, x, y, colour) {
    this.charge = charge;
    this.sign = charge / Math.abs(charge);
    this.x = x;
    this.y = y;
    this.position = new Vector(x, y);
    this.colour = colour || "#000000";
  }

  potential({ x, y }) {
    var dx = this.x - x;
    var dy = this.y - y;
    var r = Math.hypot(dx, dy);
    var V = this.charge / r;
    return V;
  }

  field({ x, y }) {
    var dx = this.x - x;
    var dy = this.y - y;
    var r = Math.hypot(dx, dy);
    var E = this.charge / (r * r);
    var Ex = (E * -dx) / r;
    var Ey = (E * -dy) / r;
    var E = new Vector(Ex, Ey);
    return E;
  }
}
