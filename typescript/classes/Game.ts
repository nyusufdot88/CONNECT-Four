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


}