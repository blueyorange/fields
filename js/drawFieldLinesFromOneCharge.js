import drawFieldLine from "./drawFieldLine.js";
import Vector from './Vector.js';
const numLines = 8;

export default function drawFieldLinesFromOneCharge(charge, charges, ctx) {
    // get start positions
    const startPositions = getStartPositions(charge.x, charge.y, numLines)
    startPositions.forEach(startPosition => drawFieldLine(charges,startPosition,ctx))
}

function getStartPositions(x, y, numLines) {
    const angle = 2 * Math.PI/numLines;
    return Array.from({ length: numLines }, (_, i) => new Vector(x + Math.cos(i * angle), y + Math.sin(i * angle)))
}