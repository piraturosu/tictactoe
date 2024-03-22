const TURNS = { PLAYER1: "X", PLAYER2: "O" };
const NAMES = ["X", "O"];

const BOARD = [null, null, null, null, null, null, null, null, null];
const WINNING_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let TURN;

function resetState() {
  for (let i = 0; i !== 9; ++i) BOARD[i] = null;

  TURN = TURNS.PLAYER1;
}

function setPlayerName(index, name) {
  NAMES[index] = name;
  setPlayerNamesLocalStorage(name, index);
}

function ticTacToe(id) {
  if (BOARD[id] !== null) throw "Already played this box!";

  BOARD[id] = TURN;
  TURN = TURN === TURNS.PLAYER1 ? TURNS.PLAYER2 : TURNS.PLAYER1;

  const countPlays = BOARD.filter((el) => el !== null).length;
  if (countPlays < 5) return;

  for (let i = 0; i !== WINNING_PATTERNS.length; ++i) {
    const value = BOARD[WINNING_PATTERNS[i][0]];
    if (value === null) continue;

    if (
      value === BOARD[WINNING_PATTERNS[i][1]] &&
      value === BOARD[WINNING_PATTERNS[i][2]]
    ) {
      storeScore(value);
      resetState();

      return value;
    }
  }

  if (countPlays === 9) {
    resetState();

    return "DRAW";
  }
}

resetState();
getNamesLocalStorage();
