const playerInfoContainer = document.getElementsByClassName("playerText");
const playerLeftInfoContainer = playerInfoContainer[0];
const playerRightInfoContainer = playerInfoContainer[1];
const scoreText = document.getElementsByClassName("scoreText");
const scoreTextLeft = scoreText[0];
const scoreTextRight = scoreText[1];
const playerName = document.getElementsByClassName("playerName");
const playerNameLeft = playerName[0];
const playerNameRight = playerName[1];
let inputs = document.querySelectorAll("input");
let playerNameInputLeft = inputs[0];
let playerNameInputRight = inputs[1];

function showNames() {
  playerNameLeft.innerText = `${NAMES[0]}`;
  playerNameRight.innerText = `${NAMES[1]}`;
}

function handlePlayerNameKeyDown(event) {
  if (event.key !== "Enter") return;

  let inputValue = event.target.value;
  let regex = /^[A-Za-z0-9]+$/;
  if (!regex.test(inputValue)) {
    showInfoText("Only Letters and Numbers accepted");
    return;
  }
  if (inputValue.length > 8) {
    showInfoText("Name must have maximum 8 characters ");
    return;
  }
  if (inputValue.length < 3) {
    showInfoText("Name must have minimum 3 characters");
    return;
  }
  updateNameAndScore(inputValue, event.target === playerNameInputLeft ? 0 : 1);
  hidePlayerNameInput(event);
  showNames();
}

function hidePlayerNameInput(event) {
  event.target.classList.add("hidden");
  const which =
    event.target === playerNameInputLeft
      ? playerLeftInfoContainer
      : playerRightInfoContainer;
  which.classList.remove("hidden");
}

function showPlayerNameInput(event) {
  event.target.closest("div").classList.add("hidden");
  const which =
    event.target === playerNameLeft
      ? playerNameInputLeft
      : playerNameInputRight;
  which.classList.remove("hidden");
}

function setName(name, index) {
  NAMES[index] = name;
  setNamesLocalStorage();
}

function updateNameAndScore(name, index) {
  setName(name, index);
  showScores();
}

//setting names in local storage
function verifyNamesLocalStorage() {
  if (!localStorage.NAMES) localStorage.setItem("NAMES", JSON.stringify(NAMES));
  getNamesLocalStorage();
}

function getNamesLocalStorage() {
  NAMES = JSON.parse(localStorage.getItem("NAMES"));
}

function setNamesLocalStorage() {
  localStorage.NAMES = JSON.stringify(NAMES);
}

verifyNamesLocalStorage();

playerNameLeft.addEventListener("click", showPlayerNameInput);
playerNameRight.addEventListener("click", showPlayerNameInput);
playerNameInputLeft.addEventListener("keydown", handlePlayerNameKeyDown);
playerNameInputRight.addEventListener("keydown", handlePlayerNameKeyDown);
