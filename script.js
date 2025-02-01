function multiplyMatrices() {
  const matrixA = [];
  const matrixB = [];
  const resultMatrix = [];

  // A
  for (let i = 0; i < 3; i++) {
    matrixA[i] = [];
    for (let j = 0; j < 3; j++) {
      matrixA[i][j] = Number(document.getElementById(`a${i}${j}`).value) || 0;
    }
  }

  // B
  for (let i = 0; i < 3; i++) {
    matrixB[i] = [];
    for (let j = 0; j < 3; j++) {
      matrixB[i][j] = Number(document.getElementById(`b${i}${j}`).value) || 0; 
    }
  }

  // C
  for (let i = 0; i < 3; i++) {
    resultMatrix[i] = [];
    for (let j = 0; j < 3; j++) {
      resultMatrix[i][j] = 0;
      for (let k = 0; k < 3; k++) {
        resultMatrix[i][j] += matrixA[i][k] * matrixB[k][j];
      }
      document.getElementById(`r${i}${j}`).textContent = resultMatrix[i][j];
    }
  }
}
