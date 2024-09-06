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

  



}