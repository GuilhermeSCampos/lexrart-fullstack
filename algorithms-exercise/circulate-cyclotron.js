const PARTICLE = {
  EMPTY: '1',
  ELECTRON: 'e',
  PROTON: 'p',
  NEUTRON: 'n',
};

function createCyclotron(rows, cols) {
  return Array(rows).fill(null).map(() => Array(cols).fill(PARTICLE.EMPTY));
}

function printCyclotron(cyclotron) {
  for (const row of cyclotron) {
    console.log(row.join(" "));
  }
}

function accelerateElectron(matrix) {
  const result = matrix.map(row => row.slice());
  for (let i = 0; i < result.length; i++) {
    result[i][0] = PARTICLE.ELECTRON;
    result[result.length - 1][i] = PARTICLE.ELECTRON;
  }
  return result;
}

function accelerateProton(matrix) {
  const result = matrix.map(row => row.slice());
  let depth = 0;
  let N = matrix.length;

  while (N > 0) {
    for (let i = depth; i < depth + N; i++) {
      if (i === depth || i === depth + N - 1) {
        for (let j = depth; j < depth + N; j++) {
          result[i][j] = PARTICLE.PROTON;
        }
      } else {
        result[i][depth] = PARTICLE.PROTON;
        result[i][depth + N - 1] = PARTICLE.PROTON;
      }
    }
    depth += 1;
    N -= 2;
  }
  return result;
}

function accelerateParticle(particle, rows, cols) {
  let matrix = createCyclotron(rows, cols);

  switch (particle) {
    case PARTICLE.ELECTRON:
      matrix = accelerateElectron(matrix);
      break;
    case PARTICLE.PROTON:
      matrix = accelerateProton(matrix);
      break;
    case PARTICLE.NEUTRON:
      // Neutron doesn't change the matrix.
      break;
    default:
      throw new Error("Unknown particle type");
  }

  printCyclotron(matrix);
}

const rows = 4;
const cols = 4;

console.log("Accelerating an electron:");
accelerateParticle(PARTICLE.ELECTRON, rows, cols);

console.log("\nAccelerating a proton:");
accelerateParticle(PARTICLE.PROTON, rows, cols);

console.log("\nAccelerating a neutron:");
accelerateParticle(PARTICLE.NEUTRON, rows, cols);
