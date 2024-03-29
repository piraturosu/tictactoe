const infoTextElement = document.getElementById("infoText");
const boardElement = document.getElementById("board");

let infoTextTimerId = null;

function hideInfoText() {
  infoTextElement.classList.add("hidden");
}

function showInfoText(text) {
  infoTextElement.innerHTML = text;
  infoTextElement.classList.remove("hidden");

  clearTimeout(infoTextTimerId);
  infoTextTimerId = setTimeout(hideInfoText, 3000);
}

function showScores() {
  scoreTextLeft.innerText = `${SCORE.PLAYER1}`;
  scoreTextRight.innerText = `${SCORE.PLAYER2}`;
}

function handleBoardCellClick(event) {
  try {
    const cell = event.target;

    play(cell.dataset.index);

    cell.innerHTML = BOARD[cell.dataset.index];
    cell.style.backgroundColor = "crimson";
  } catch (error) {
    showInfoText(error);
  }
}

function handleBoardCellEnter(event) {
  const cell = event.target;

  cell.classList.add("semi-opaque");

  if (BOARD[cell.dataset.index] === null) cell.innerHTML = TURN;
  else cell.style.backgroundColor = "crimson";
}

function handleBoardCellLeave(event) {
  const cell = event.target;

  cell.classList.remove("semi-opaque");

  if (BOARD[cell.dataset.index] === null) cell.innerHTML = "";
  else cell.style.backgroundColor = "royalblue";
}

function createBoardCell(index) {
  const cellElement = document.createElement("div");

  cellElement.classList.add("cell");
  cellElement.setAttribute("data-index", index);
  cellElement.addEventListener("click", handleBoardCellClick);
  cellElement.addEventListener("mouseenter", handleBoardCellEnter);
  cellElement.addEventListener("mouseleave", handleBoardCellLeave);

  return cellElement;
}

function resetBoardView() {
  boardElement.innerHTML = "";
  for (let i = 0; i !== BOARD.length; ++i) {
    boardElement.appendChild(createBoardCell(i));
  }
}

function play(id) {
  const result = ticTacToe(id);
  if (result == null) return;

  if (result === "DRAW") showInfoText("It's a draw!");
  else {
    showInfoText(`<b>${result}</b> wins!`);
    showScores();
  }

  resetBoardView();
}

resetBoardView();
showPlayerNames();
showScores();
