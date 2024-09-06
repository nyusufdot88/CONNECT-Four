import Board from "./Board.js";
export default class Player {
  name: string;
  color: string
  Board: Board
  constructor(name: string, color: string, board: Board) {
    this.name = name;
    this.color = color;
    this.Board = board;
  }

}

