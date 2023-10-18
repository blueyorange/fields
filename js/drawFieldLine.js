export default function drawFieldLine(q, position, direction) {
  var i;
  var insideCanvas = true;
  var E = new Vector(0, 0);
  var insideCharge = false;

  do {
    (E.x = 0), (E.y = 0);
    insideCanvas = !Boolean(
      position.x < 0 ||
        position.x > canvas.width ||
        position.y < 0 ||
        position.y > canvas.height
    );
    console.log("insideCanvas = " + insideCanvas);
    ctx.moveTo(position.x, position.y);

    for (i = 0; i < q.length; i++) {
      E = Vector.add(E, q[i].E(position.x, position.y));
      insideCharge = Boolean(
        insideCharge ||
          Vector.distance(position, q[i].position) < q[i].radius - 19
      );
    }

    E.normalise();
    position.x = position.x + direction * E.x;
    position.y = position.y + direction * E.y;
    ctx.lineTo(position.x, position.y);
  } while (!insideCharge && insideCanvas);
  ctx.stroke();
}
