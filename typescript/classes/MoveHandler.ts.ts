export class MoveHandler {
  makeMove(
    matrix: Array<Array<string>>,
    color: string,
    column: number,
    currentPlayerColor: string,
    gameOver: boolean
  ): [boolean, string | boolean] {
    if (gameOver) {
      return [false, currentPlayerColor];
    }
    if (color !== 'X' && color !== 'O') {
      return [false, currentPlayerColor];
    }
    if (color !== currentPlayerColor) {
      return [false, currentPlayerColor];
    }
    if (isNaN(column) || column < 0 || column >= matrix[0].length) {
      return [false, currentPlayerColor];
    }
    let row = -1;
    for (let i = matrix.length - 1; i >= 0; i--) {
      if (matrix[i][column] === ' ') {
        row = i;
        break;
      }
    }
    // no move if colum is full
    if (row === -1) {
      return [false, currentPlayerColor];
    }

    // make the move
    matrix[row][column] = color;

    // Switch player
    const newPlayerColor = currentPlayerColor === 'X' ? 'O' : 'X';

    // return true if the move could be made
    return [true, newPlayerColor];
  }
}
