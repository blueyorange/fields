export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get magnitude() {
    return Math.hypot(this.x, this.y);
  }

  static add(A, B) {
    var x = A.x + B.x;
    var y = A.y + B.y;
    var C = new Vector(x, y);
    return C;
  }

  static subtract(A, B) {
    var x = A.x - B.x;
    var y = A.y - B.y;
    var C = new Vector(x, y);
    return C;
  }

  static distance(A, B) {
    return Math.hypot(A.x - B.x, A.y - B.y);
  }

  static normal(A) {
    var B = new Vector(A.y, -A.x);
    return B;
  }

  normalise() {
    if (this.magnitude !== 0) {
      const x = this.x / this.magnitude;
      const y = this.y / this.magnitude;
      return new Vector(x, y);
    } else return this;
  }
}
