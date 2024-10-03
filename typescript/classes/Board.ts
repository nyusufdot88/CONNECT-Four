import { MoveHandler } from './MoveHandler.ts.js';
import { WinChecker } from './WinCheckers.js';

export default class Board {
  matrix: Array<Array<string>>;
  currentPlayerColor: string;
  gameOver: boolean;
  isADraw: boolean;
  winner: string | boolean;

  private moveHandler: MoveHandler;
  private winChecker: WinChecker;

  constructor() {
    this.matrix = [...new Array(6)].map((_row) =>
      [...Array(7)].map((_column) => ' ')
    );
    this.currentPlayerColor = 'X';
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;

    this.moveHandler = new MoveHandler();
    this.winChecker = new WinChecker();
  }

  render(): void {
    let line = '\n' + '-'.repeat(22) + '\n';
    console.log(
      line +
        this.matrix
          .map((row) => row.map((column) => `| ${column}`).join('') + '|')
          .join(line) +
        line
    );
  }

  makeMove(color: string, column: number): boolean {
    const [moveMade, newPlayerColor] = this.moveHandler.makeMove(
      this.matrix,
      color,
      column,
      this.currentPlayerColor,
      this.gameOver
    );

    if (!moveMade) return false;

    this.winner = this.winChecker.winCheck(
      this.matrix,
      this.currentPlayerColor
    );
    this.isADraw = this.winChecker.drawCheck(this.matrix);
    this.gameOver = !!(this.winner || this.isADraw);

    this.currentPlayerColor = newPlayerColor as string;

    return true;
  }
}
