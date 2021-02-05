const matrixInversion = (matrix) => {
  if (!Array.isArray(matrix)) return;

  matrix.map(value => value.reverse());
  return matrix.reverse();
}

module.exports = matrixInversion;