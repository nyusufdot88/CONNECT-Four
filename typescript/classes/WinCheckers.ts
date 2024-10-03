export class WinChecker {
  winCheck(
    matrix: Array<Array<string>>,
    currentPlayerColor: string
  ): string | false {
    // Win checking...
    let m = matrix;
    // represent ways you can win as offset from ONE position on the board
    let offsets = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3]
      ], // horizontal win
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0]
      ], // vertical win
      [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3]
      ], // diagonal 1 win
      [
        [0, 0],
        [1, -1],
        [2, -2],
        [3, -3]
      ] // diagonal 2 win
    ];

    // loop through each position on the board
    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[i].length; j++) {
        // loop through each way you can win
        for (let k = 0; k < offsets.length; k++) {
          let offset = offsets[k];
          let count = 0;
          // loop through each position in the win
          for (let l = 0; l < offset.length; l++) {
            let row = i + offset[l][0];
            let column = j + offset[l][1];
            // if the position is on the board and is the same color as the current player
            if (
              row >= 0 &&
              row < m.length &&
              column >= 0 &&
              column < m[i].length &&
              m[row][column] === currentPlayerColor
            ) {
              count++;
            }
          }
          // if you've found 4 in a row, return the current player color
          if (count === 4) {
            return currentPlayerColor;
          }
        }
      }
    }
    return false;
  }

  drawCheck(matrix: Array<Array<string>>): boolean {
    // if no one has won and no empty positions, then it's a draw
    return !matrix.flat().includes(' ');
  }
}
