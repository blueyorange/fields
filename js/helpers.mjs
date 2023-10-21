export function getEquallySpacedPointsAroundCircle(x, y, r, n) {
  const angle = (2 * Math.PI) / n;
  return Array.from({ length: n }, (_, i) => {
    return { x: x + r * Math.cos(i * angle), y: y + r * Math.sin(i * angle) };
  });
}

export function thinPoints(points, totalPointsToKeep) {
  if (totalPointsToKeep >= points.length) {
    return points; // No reduction needed
  }

  // Sort points by field strength in descending order
  points.sort((a, b) => b.fieldStrength - a.fieldStrength);

  const reducedPoints = [];
  const densityFactor = points.length / totalPointsToKeep;
  const interval = Math.floor(points.length / totalPointsToKeep);

  for (let i = 0; i < totalPointsToKeep; i++) {
    const selectedPoint = points[Math.floor(i * densityFactor)];
    reducedPoints.push(selectedPoint);
  }

  return reducedPoints;
}
