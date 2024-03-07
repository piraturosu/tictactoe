const message = document.getElementById('message');
const boardView = document.getElementById('boardView');
const scoreboards = document.getElementsByClassName('scoreboard');
const scoreboardP1 = scoreboards[0];
const scoreboardP2 = scoreboards[1];
scoreboardP1.innerText = `Player 1: ${SCORE.PLAYER1}`;
scoreboardP2.innerText = `Player 2: ${SCORE.PLAYER2}`;

let timer;

function play(id) {
  const result = ticTacToe(id);
  if (result == null) return;

  if (timer) clearTimeout(timer);

  storeScore(result);
  showResults(result);

  resetState();
  resetBoardView();

  timer = setTimeout(deleteMessage, 5000);
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
