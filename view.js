const message = document.getElementById('message');
const boardView = document.getElementById('boardView');
const scoreTexts = document.getElementsByClassName('scoreText');
const scoreTextP1 = scoreTexts[0];
const scoreTextP2 = scoreTexts[1];
scoreTextP1.innerText = `Player 1: ${SCORE.PLAYER1}`;
scoreTextP2.innerText = `Player 2: ${SCORE.PLAYER2}`;

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
  scoreTextP1.innerText = `Player 1: ${SCORE.PLAYER1}`;
  scoreTextP2.innerText = `Player 2: ${SCORE.PLAYER2}`;
}

function deleteMessage() {
  // message.innerHTML = ``;
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
