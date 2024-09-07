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


}