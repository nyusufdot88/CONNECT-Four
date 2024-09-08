import prompt from "../helpers/prompt.js";
import Board from "./Board.js";
import Player from "./Player.js";

export default class Game {

  board: Board;
  playerX: Player;
  playerO: Player;
  isVsAI: boolean;

  constructor() {
    while (true) {
      this.chooseGameMode();
      this.createPlayers();
      this.board = new Board();
      this.startGameLoop();
      this.whoHasWonOnGameOver();
      // ask if we should play again
      console.log('');
      let playAgain = prompt('Vill ni spela igen? (ja/nej)? ');
      if (playAgain !== 'ja') { break; }
    }
  }

  chooseGameMode(): void{
    console.clear()
    console.log('Välje spelläge mata in (1) eller (2)\n');
    const mode = prompt('1- Human vs Human\n2- Human vs AI ....');
    this.isVsAI = mode === '2';
  }
  
  createPlayers(): void {
    console.clear();
    console.log('Connect-FOUR\n');
    this.playerX = new Player(prompt('Spelare X:s namn: '), 'X', this.board);

    if (this.isVsAI) {
      this.playerO = new Player('Computer', 'O', this.board); // AI player
    } else {
      this.playerO = new Player(prompt('Spelare O:s namn: '), 'O', this.board)
    }
  }

  startGameLoop(): void {
    // game loop - runs until the game is over
    while (!this.board.gameOver) {
      console.clear();
      this.board.render();
      let player = this.board.currentPlayerColor === 'X'
        ? this.playerX : this.playerO;
      if (this.isVsAI && player.color === 'O') {
        this.AImove();
      } else {
        this.humanMove(player)
      }
    }
  }

    humanMove(player: Player): void {
    let move = prompt(`Ange ditt drag ${player.color} ${player.name} - skriv in kolumn: `);
    let column = +move.trim() - 1;
    this.board.makeMove(player.color, column);
  }

  AImove(): void {
    console.log('Datorn gör sitt drag...');
    let validMoves = this.getValidColumns();
    let randomColumn = validMoves[Math.floor(Math.random() * validMoves.length)];
    this.board.makeMove('O', randomColumn);
  }

    getValidColumns(): number[] {
    let validColumns: number[] = [];
    for (let column = 0; column < this.board.matrix[0].length; column++) {
      if (this.board.matrix[0][column] === ' ') {
        validColumns.push(column);
      }
    }
    return validColumns;
  }

  whoHasWonOnGameOver(): void {
    // the game is over, tell the player who has one or if we have a draw
    console.clear();
    this.board.render();
    if (this.board.winner) {
      let winningPlayer = (this.board.winner === 'X' ? this.playerX : this.playerO);
      console.log(`WOW ${winningPlayer.name} som spelade med ${winningPlayer.color}:  vann!`);
    }
    else {
      console.log('Tyvärr det blev oavgjort...');
    }
  }
}