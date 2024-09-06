export default class Board {

  matrix: Array<Array<string>>;
  currentPlayerColor: string;
  gameOver: boolean;
  isADraw: boolean;
  winner: string | boolean;

  constructor() {
    this.matrix = [... new Array(6)].map(_row => [...Array(7)].map(_column => ' '))
    this.currentPlayerColor = 'X';
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }

    render(): void {
    let line = '\n' + '-'.repeat(22) + '\n';
    console.log(
      line +
      this.matrix.map(row =>
        row.map(column => `| ${column}`).join('') + '|').join(line) + line);
  }

  makeMove(color: string, column: number): boolean {
    // don't make any move if the game is over
    if (this.gameOver) { return false; }
    // check that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }
    // check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayerColor) { return false; }
    // check the column rang is and make use it is a number
    if (isNaN(column) || column < 0 || column >= this.matrix[0].length) { return false; }
    //find the lowest empty place in the column
    let row = -1;
    for (let i = this.matrix.length - 1; i >= 0; i--) {
      if (this.matrix[i][column] === ' ') {
        row = i;
        break;
      }
    }
    //the colum is full - no move
    if (row === -1) {
      return false;
    }
    //make the move
    this.matrix[row][column] = color;
    // check if someone has won or if it's a draw/tie and update properties
    this.winner = this.winCheck();
    this.isADraw = this.drawCheck();
    // the game is over if someone has won or if it's a draw
    this.gameOver = !!(this.winner || this.isADraw);

    // Switch player
    this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';

    // return true if the move could be made
    return true;
  }

  winCheck(): string | false {
    // m - a short alias for this.matrix
    let m = this.matrix;
    // represent ways you can win as offset from ONE position on the board
    let offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]],  // horizontal win
      [[0, 0], [1, 0], [2, 0], [3, 0]],  // vertical win
      [[0, 0], [1, 1], [2, 2], [3, 3]],  // diagonal 1 win
      [[0, 0], [1, -1], [2, -2], [3, -3]]  // diagonal 2 win
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
            if (row >= 0 && row < m.length && column >= 0 && column <
              m[i].length && m[row][column] === this.currentPlayerColor) {
              count++;
            }
          }
          // if you've found 4 in a row, return the current player color
          if (count === 4) {
            return this.currentPlayerColor;
          }
        }
      }
    }
    return false

  }
    // check for a draw/tie
    drawCheck(): boolean {
      // if no one has won and no empty positions then it's a draw
       return !this.winCheck() && !this.matrix.flat().includes(' ');
    }
}