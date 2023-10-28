import Vector from "./Vector.js";
import config from "./config.js";

export default class Field {
  constructor(charges) {
    this.charges = charges || [];
  }

  strength(position) {
    return this.charges.reduce(
      (total, charge) => Vector.add(total, charge.field(position)),
      new Vector(0, 0)
    );
  }

  fieldLine(startPosition, direction) {
    // returns an array of points constituting the field line
    let position = startPosition;
    const points = [startPosition];
    let iterations = 0;
    let fieldStrength;
    // iterate following E direction to generate points
    do {
      iterations++;
      // calculate the field strength at this point
      fieldStrength = this.strength(position);
      // make E only one pixel long, to advance one pixel each step
      // multiply by +1 or -1 depending on charge
      const unitVector = fieldStrength.normalise().scale(direction);
      position = Vector.add(position, unitVector);
      iterations++;
      // add new point to array
      points.push(position);
    } while (
      fieldStrength.magnitude < config.maxFieldStrength &&
      iterations < config.maxIterations
    );
    return direction === -1 ? points.reverse() : points;
  }

  fieldLinesFromCharge(charge) {
    // get start positions
    const startPositions = this.#getStartPoints(charge);
    // returns an array of arrays containing the field line points
    const lines = startPositions.map((position) =>
      this.fieldLine(position, charge.sign)
    );
    return lines;
  }

  #getStartPoints(charge) {
    const n = config.fieldLinesPerCharge;
    const angle = (2 * Math.PI) / n;
    const { x, y } = charge.position;
    const r = config.chargeRadius + 1;
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
    return sortedPointsByFieldStrength.slice(0, config.fieldLinesPerCharge);
  }

  fieldLines() {
    const positiveCharges = this.charges.filter((charge) => charge.sign === 1);
    const negativeCharges = this.charges.filter((charge) => charge.sign === -1);
    const chargesToDrawLinesFrom =
      positiveCharges.length >= negativeCharges.length
        ? positiveCharges
        : negativeCharges;
    return chargesToDrawLinesFrom
      .map((charge) => this.fieldLinesFromCharge(charge))
      .flat();
  }

  #isInsideCanvas(position) {
    // returns true if position is inside drawing area, or false otherwise
    return (
      position.x > 0 &&
      position.x < config.width &&
      position.y > 0 &&
      position.y < config.height
    );
  }
}
