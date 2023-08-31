function createCyclotron(rows, cols) {
  const cyclotron = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(1); // Initialize with 1 (empty)
    }
    cyclotron.push(row);
  }
  return cyclotron;
}

function printCyclotron(cyclotron) {
  for (const row of cyclotron) {
    console.log(row.join(" "));
  }
}

function cyclotron(particle, matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const cyclotron = createCyclotron(rows, cols);

  // Fill the cyclotron based on particle type
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === particle) {
        cyclotron[i][j] = particle;
      }
    }
  }

  // Print the resulting cyclotron
  printCyclotron(cyclotron);
}

// Example matrix for accelerating an electron
const electronMatrix = [
  ['e', 'e', 'e', 'e'],
  ['1', '1', '1', 'e'],
  ['1', '1', '1', 'e'],
  ['1', '1', '1', 'e']
];

console.log("Cyclotron without particles:");
cyclotron('e', electronMatrix);