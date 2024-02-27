const BOARD = [null, null, null, null, null, null, null, null, null];
const WINS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let message = document.getElementById('message');
let turn = true;

function storeClickedId(clickedId) {
  // console.log(clickedId);
  if (BOARD[clickedId] !== null) return;

  BOARD[clickedId] = turn;
  document.getElementById(`${clickedId}`).innerText = turn ? 'X' : 'O';
  turn = !turn;
  const count = BOARD.filter((el) => {
    return el !== null;
  }).length;
  if (count < 5) return;

  console.log('verific');
  for (let i = 0; i !== WINS.length; ++i) {
    console.log(BOARD[WINS[i][0]], 'verific');
    const value = BOARD[WINS[i][0]];
    if (value === null) continue;

    if (value === BOARD[WINS[i][1]] && value === BOARD[WINS[i][2]]) {
      if (value === true) {
        console.log('first');
        message.innerHTML = 'Player 1 Wins!';
      } else {
        console.log('second');
        message.innerHTML = 'Player 2 Wins!';
      }
    }
  }
}
