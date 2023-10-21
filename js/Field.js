import Vector from "./Vector.js";
import config from "./config.js";
import { getEquallySpacedPointsAroundCircle, thinPoints } from "./helpers.mjs";

export default class Field {
  constructor(charges) {
    this.charges = charges || [];
  }

  strength(position) {
    return this.charges.reduce(
      (total, charge) =>
        Vector.add(total, this.#fieldStrength(charge, position)),
      new Vector(0, 0)
    );
  }

  #fieldStrength(charge, position) {
    // calculates the field strength for a given charge and position
    // returns a Vector
    const dx = position.x - charge.x;
    const dy = position.y - charge.y;
    const r = Math.hypot(dx, dy);
    const mag = charge.charge / (r * r);
    const Ex = (mag * dx) / r;
    const Ey = (mag * dy) / r;
    return new Vector(Ex, Ey);
  }

  fieldLine(startPosition) {
    // returns an array of points consituting the field line
    let position = startPosition;
    const points = [startPosition];
    var insideCanvas = true;
    const maxIterations = 1000;
    let iterations = 0;
    // iterate following E direction to generate points
    do {
      insideCanvas = !Boolean(
        position.x < 0 ||
          position.x > config.width ||
          position.y < 0 ||
          position.y > config.height
      );
      // calculate the field strength at this point
      const E = this.strength(position);
      // make E only one pixel long, to advance one pixel each step
      E.normalise();
      position = Vector.add(position, E);
      iterations++;
      // add new point to array
      points.push(position);
    } while (insideCanvas && iterations < maxIterations);
    return points;
  }

  fieldLinesFromCharge(charge) {
    // get start positions
    const startPositions = this.#getStartPoints(charge);
    // returns an array of arrays containing the field line points
    const points = startPositions.map((position) => this.fieldLine(position));
    return points;
  }

  #getStartPoints(charge) {
    const n = 32;
    const angle = (2 * Math.PI) / n;
    const { x, y } = charge.position;
    const r = 10;
    const equallySpacedPoints = Array.from({ length: n }, (_, i) => {
      return new Vector(
        x + r * Math.cos(i * angle),
        y + r * Math.sin(i * angle)
      );
    });
    if (this.charges.length == 1) {
      return equallySpacedPoints;
    }
    const sortedPointsByFieldStrength = equallySpacedPoints.sort((a, b) => {
      return this.strength(b).magnitude - this.strength(a).magnitude;
    });
    return sortedPointsByFieldStrength.slice(0, 28);
  }

  fieldLines() {
    return this.charges
      .map((charge) => this.fieldLinesFromCharge(charge))
      .flat();
  }
}
