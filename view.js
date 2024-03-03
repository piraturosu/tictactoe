const message = document.getElementById('message');
const scoreboard = document.getElementById('scoreboard');
const boardView = document.getElementById('boardView');

function play(id) {
  const result = ticTacToe(id);

  if (result == null) return;

  storeScore(result);
  showResults(result);
  resetState();
  resetBoardView();
}

function showResults(result) {
  message.innerHTML = `<b>${TURN}</b> wins!`;
  scoreboard.innerText = `
  Player 1: ${SCORE.PLAYER1}

  Player 2: ${SCORE.PLAYER2}`;
}

function createBoardCellButton(index) {
  const patrat = document.createElement('div');
  patrat.className = 'patrat';
  patrat.addEventListener('click', (e) => {
    play(index);
    e.target.innerHTML = TURN;
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
