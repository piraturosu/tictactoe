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

let count = 0;
let message = document.getElementById('message');
let turn = false;

function storeClickedId(clickedId) {
  // console.log(clickedId);
  BOARD[clickedId] = turn;
  turn = !turn;
  if ((count & 1) === 0) {
    BOARD[clickedId] = true;
    document.getElementById(`${clickedId}`).innerText = 'X';
    count += 1;
  } else {
    BOARD[clickedId] = false;
    document.getElementById(`${clickedId}`).innerText = 'O';
    count += 1;
  }

  if (count < 5) return;

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
