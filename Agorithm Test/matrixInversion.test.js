const  matrixInversion  = require('./matrixInversion');

test(
  `Test 1 for matrix inversion: arr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]`,
  () => {
    expect(matrixInversion([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]))
      .toEqual([
        [9, 8, 7],
        [6, 5, 4],
        [3, 2, 1]
      ]);
  }
)

test(
  `Test 3 for matrix inversion: arr = []`,
  () => {
    expect(matrixInversion([]))
      .toEqual([]);
  }
)

test(
  `Test 2 for matrix inversion: arr = [
        [],
        [],
        [1, 2, 3],
        []
    ]`,
  () => {
    expect(matrixInversion([
      [],
      [],
      [1, 2, 3],
      []
    ]))
      .toEqual([
        [],
        [3, 2, 1],
        [],
        []
      ]);
  }
)

test(
  `Test 4 for not an matrix: arr = 123`,
  () => {
    expect(matrixInversion(123))
      .toEqual();
  }
)