const playerInfoContainer = document.getElementsByClassName("playerText");
const playerLeftInfoContainer = playerInfoContainer[0];
const playerRightInfoContainer = playerInfoContainer[1];
const scoreText = document.getElementsByClassName("scoreText");
const scoreTextLeft = scoreText[0];
const scoreTextRight = scoreText[1];
const playerName = document.getElementsByClassName("playerName");
const playerNameLeft = playerName[0];
const playerNameRight = playerName[1];
const inputs = document.querySelectorAll("input");
const playerNameInputLeft = inputs[0];
const playerNameInputRight = inputs[1];

function showNames() {
  playerNameLeft.innerText = `${NAMES[0]}`;
  playerNameRight.innerText = `${NAMES[1]}`;
}

function handlePlayerNameKeyDown(event) {
  if (event.key === "Escape") {
    hidePlayerNameInput(event);
    document.removeEventListener("click", handleClickOutsideInput);
    return;
  }
  if (event.key !== "Enter") return;

  const regex = /^[A-Za-z0-9]+$/;
  const inputValue = event.target.value;
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
  setName(inputValue, event.target === playerNameInputLeft ? 0 : 1);
  showScores();
  hidePlayerNameInput(event);
  showNames();
  document.removeEventListener("click", handleClickOutsideInput);
}

function handleClickOutsideInput(event) {
  let ev;
  console.log("in handleClick");
  if (
    playerNameInputLeft.classList.contains("hidden") &&
    playerNameInputRight.classList.contains("hidden")
  ) {
    console.log("both hidden");
    return;
  }
  if (
    !playerNameInputLeft.classList.contains("hidden") &&
    event.target !== playerNameLeft
  ) {
    console.log("in handleClick");
    ev = { target: playerNameInputLeft };
    setName(playerNameInputLeft.value, 0);
    hidePlayerNameInput(ev);
    showNames();
    document.removeEventListener("click", handleClickOutsideInput);
  }
  if (
    !playerNameInputRight.classList.contains("hidden") &&
    event.target !== playerNameRight
  ) {
    ev = { target: playerNameInputRight };
    setName(playerNameInputRight.value, 1);
    hidePlayerNameInput(ev);
    showNames();
    document.removeEventListener("click", handleClickOutsideInput);
  }
}

function hidePlayerNameInput(event) {
  event.target.classList.add("hidden");

  const elContainer =
    event.target === playerNameInputLeft
      ? playerLeftInfoContainer
      : playerRightInfoContainer;

  elContainer.classList.remove("hidden");
}

function showPlayerNameInput(event) {
  let ev;
  if (!playerNameInputLeft.classList.contains("hidden"))
    ev = { target: playerNameInputLeft };
  if (!playerNameInputRight.classList.contains("hidden"))
    ev = { target: playerNameInputRight };
  if (ev) hidePlayerNameInput(ev);

  event.target.closest("div").classList.add("hidden");
  console.log("in showPlayer");

  const [elInput, index] =
    event.target === playerNameLeft
      ? [playerNameInputLeft, 0]
      : [playerNameInputRight, 1];

  elInput.value = NAMES[index];
  elInput.classList.remove("hidden");
  elInput.focus();
  document.addEventListener("click", handleClickOutsideInput);
}

getNamesLocalStorage();

playerNameLeft.addEventListener("click", showPlayerNameInput);
playerNameRight.addEventListener("click", showPlayerNameInput);
playerNameInputLeft.addEventListener("keydown", handlePlayerNameKeyDown);
playerNameInputRight.addEventListener("keydown", handlePlayerNameKeyDown);
