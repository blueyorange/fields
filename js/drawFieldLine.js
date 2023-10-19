import Vector from './Vector.js'
import config from './config.js'

export default function drawFieldLine(charges, position,ctx) {
  var i;
  var insideCanvas = true;
  const maxIterations = 1000;
  let it = 0;
  
  do {
    ctx.moveTo(position.x, position.y);
    insideCanvas = !Boolean(
      position.x < 0 ||
        position.x > config.width ||
        position.y < 0 ||
        position.y > config.height
    );

    const E = charges.reduce((total, charge) => Vector.add(total, charge.E(position.x, position.y)),new Vector(0,0))
    
    E.normalise();
    position = Vector.add(position, E);
    ctx.lineTo(position.x, position.y);
    it++
  } while (insideCanvas && it<maxIterations);
  ctx.stroke();
}
