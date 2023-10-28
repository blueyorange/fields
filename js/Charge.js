import Vector from "./Vector.js";

export default class Charge {
  constructor(sign, x, y) {
    this.sign = sign;
    this.x = x;
    this.y = y;
    this.position = new Vector(x, y);
  }

  potential(point) {
    const r = point.subtract(this.position);
    return this.sign / r;
  }

  field(point) {
    const positionVector = point.subtract(this.position);
    const unitVector = positionVector.normalise();
    const r = positionVector.magnitude;
    return unitVector.scale(this.sign / (r * r));
  }
}
