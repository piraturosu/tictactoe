const message = document.getElementById('message');
const scoreboardP1 = document.getElementById('scoreboardP1');
const scoreboardP2 = document.getElementById('scoreboardP2');
const boardView = document.getElementById('boardView');
scoreboardP1.innerText = `Player 1: ${SCORE.PLAYER1}`;
scoreboardP2.innerText = `Player 2: ${SCORE.PLAYER2}`;

let timer;

function play(id) {
  const result = ticTacToe(id);
  if (result == null) return;
  if (timer) {
    clearTimeout(timer);
  }
  storeScore(result);
  showResults(result);
  timer = setTimeout(deleteMessage, 5000);
  resetState();
  resetBoardView();
}

function showResults(result) {
  message.innerHTML = `<b>${TURN}</b> wins!`;
  scoreboardP1.innerText = `Player 1: ${SCORE.PLAYER1}`;
  scoreboardP2.innerText = `Player 2: ${SCORE.PLAYER2}`;
}

function deleteMessage() {
  message.innerHTML = ``;
}

function createBoardCellButton(index) {
  const patrat = document.createElement('div');
  patrat.className = 'patrat';
  patrat.addEventListener('click', (event) => {
    play(index);
    event.target.innerHTML = TURN;
  });
  return patrat;
}

function resetBoardView() {
  boardView.innerHTML = '';
  for (let i = 0; i !== BOARD.length; ++i) {
    boardView.appendChild(createBoardCellButton(i));
  }
}

resetBoardView();
