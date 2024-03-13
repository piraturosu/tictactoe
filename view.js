const infoTextElement = document.getElementById("infoText");
const boardElement = document.getElementById("board");
const scores = document.getElementsByClassName("scoreText");
const inputs = document.querySelectorAll("input");
const scoreTextLeft = scores[0];
const scoreTextRight = scores[1];
const playerNameInputLeft = inputs[0];
const playerNameInputRight = inputs[1];

let infoTextTimerId = null;

function hideInfoText() {
  infoTextElement.classList.add("hidden");
}

function showInfoText(text) {
  infoTextElement.innerHTML = text;
  infoTextElement.classList.remove("hidden");

  if (infoTextTimerId) clearTimeout(infoTextTimerId);
  infoTextTimerId = setTimeout(hideInfoText, 3000);
}

function handlePlayerNameKeyDown(event) {
  if (event.key !== "Enter") return;

  let inputValue = event.target.value;
  let regex = /^[A-Za-z0-9]+$/;
  if (!regex.test(inputValue)) {
    showInfoText("Only Letters and Numbers accepted");
    return;
  }
  if (inputValue.length > 9) {
    showInfoText("Name must have maximum 8 characters ");
    return;
  }
  if (inputValue.length < 3) {
    showInfoText("Name must have minimum 3 characters");
    return;
  }

  setName(inputValue, event.target === playerNameInputLeft ? 0 : 1);
  hidePlayerNameInput(event);
  showScores();
}

function hidePlayerNameInput(event) {
  event.target.classList.add("hidden");
  const which =
    event.target === playerNameInputLeft ? scoreTextLeft : scoreTextRight;
  which.classList.remove("hidden");
}

function showPlayerNameInput(event) {
  event.target.classList.add("hidden");
  const which =
    event.target === scoreTextLeft ? playerNameInputLeft : playerNameInputRight;
  which.classList.remove("hidden");
}

function showScores() {
  scoreTextLeft.innerHTML = `${NAMES[0]} -- ${SCORE.PLAYER1}`;
  scoreTextRight.innerHTML = `${SCORE.PLAYER2} -- ${NAMES[1]}`;
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
showScores();

scoreTextLeft.addEventListener("click", showPlayerNameInput);
scoreTextRight.addEventListener("click", showPlayerNameInput);
playerNameInputLeft.addEventListener("keydown", handlePlayerNameKeyDown);
playerNameInputRight.addEventListener("keydown", handlePlayerNameKeyDown);
