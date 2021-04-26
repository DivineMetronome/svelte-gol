type Coord = [x: number, y: number];
export type NeighborMap = Record<number, Coord[]>;
export type Board = boolean[][];

export class Game {
  private _board: Board;
  private neighborMap: NeighborMap;

  constructor(cols: number, rows: number) {
    this._board = this.generateBoardRandom(cols, rows);
    this.generateNeighborMap();
  }
  private generateBoardEmpty(cols: number, rows: number): Board {
    return Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(false));
  }

  private generateBoardRandom(cols: number, rows: number): Board {
    return Array(rows)
      .fill(null)
      .map(() =>
        Array(cols)
          .fill(false)
          .map(() => Math.random() > 0.8)
      );
  }

  // maps with tuples as keys would be nice, but it's not like the DOM can handle a 2^24x2^24 board
  private coordsToKey(x: number, y: number) {
    return (x << 24) + y;
  }

  // yup, this ain't the greatest solution
  private generateNeighborMap() {
    const map: NeighborMap = {};
    for (let x = 0; x < this.cols; x++) {
      let left = x - 1;
      if (left < 0) {
        left = this.cols - 1;
      }
      let right = x + 1;
      if (right === this.cols) {
        right = 0;
      }
      for (let y = 0; y < this.rows; y++) {
        let up = y - 1;
        if (up < 0) {
          up = this.rows - 1;
        }
        let down = y + 1;
        if (down === this.rows) {
          down = 0;
        }
        map[this.coordsToKey(x, y)] = [
          [left, up],
          [x, up],
          [right, up],
          [left, y],
          [right, y],
          [left, down],
          [x, down],
          [right, down],
        ];
      }
    }
    this.neighborMap = map;
  }

  public nextGeneration() {
    const cols = this.cols;
    const rows = this.rows;
    let newBoard = this.generateBoardEmpty(cols, rows);
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const neighbors = this.neighborMap[this.coordsToKey(x, y)];
        let alive = 0;
        for (const [nx, ny] of neighbors) {
          alive += +this._board[ny][nx];
        }
        const has3 = alive === 3;
        const has2 = alive === 2;
        if (has3 || (this._board[y][x] && (has2 || has3))) {
          newBoard[y][x] = true;
        }
      }
    }
    this._board = newBoard;
    return newBoard;
  }

  public setCell(x: number, y: number, alive: boolean) {
    this._board[y][x] = alive;
    return this._board;
  }

  public get board() {
    return this._board;
  }
  public get rows() {
    return this._board.length;
  }
  public get cols() {
    return this._board[0]?.length;
  }

  public randomizeBoard() {
    this._board = this.generateBoardRandom(this.cols, this.rows);
    return this._board;
  }

  public clearBoard() {
    this._board = this.generateBoardEmpty(this.cols, this.rows);
    return this._board;
  }

  public setSize(cols: number, rows: number) {
    const newBoard = this.generateBoardEmpty(cols, rows);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        newBoard[y][x] = this._board[y]?.[x] || false;
      }
    }
    this._board = newBoard;
    this.generateNeighborMap();

    return newBoard;
  }
}
