const playerInfoContainers = document.getElementsByClassName("playerInfoGroup");
const playerInfoContainerLeft = playerInfoContainers[0];
const playerInfoContainerRight = playerInfoContainers[1];
const scoreTexts = document.getElementsByClassName("scoreText");
const scoreTextLeft = scoreTexts[0];
const scoreTextRight = scoreTexts[1];
const playerNameTexts = document.getElementsByClassName("playerNameText");
const playerNameTextLeft = playerNameTexts[0];
const playerNameTextRight = playerNameTexts[1];
const playerNameInputs = document.querySelectorAll("input");
const playerNameInputLeft = playerNameInputs[0];
const playerNameInputRight = playerNameInputs[1];

function showPlayerNames() {
  playerNameTextLeft.innerText = `${NAMES[0]}`;
  playerNameTextRight.innerText = `${NAMES[1]}`;
}

function handlePlayerNameInputKeyDown(event) {
  if (event.key === "Escape") {
    hidePlayerNameInput(event);
    document.removeEventListener("click", handleDocumentClick);
    return;
  }
  if (event.key !== "Enter") return;

  const regex = /^[A-Za-z0-9]+$/;
  const inputValue = event.target.value;

  if (!regex.test(inputValue)) {
    showInfoText("Only letters and numbers accepted");
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

  const index = event.target === playerNameInputLeft ? 0 : 1;
  setPlayerName(index, inputValue);
  hidePlayerNameInput(event);
  showPlayerNames();
  showScores();

  document.removeEventListener("click", handleDocumentClick);
}

function handleDocumentClick(event) {
  if (
    playerNameInputLeft.classList.contains("hidden") &&
    playerNameInputRight.classList.contains("hidden")
  ) {
    return;
  }

  if (
    event.target === playerNameInputLeft ||
    event.target === playerNameInputRight
  ) {
    return;
  }

  // const [index, inputElement] = playerNameInputRight.classList.contains(
  //   "hidden",
  // )
  //   ? [0, playerNameInputLeft]
  //   : [1, playerNameInputRight];
  // setPlayerName(index, inputElement.value);
  // hidePlayerNameInput({ target: inputElement });

  if (playerNameInputRight.classList.contains("hidden")) {
    setPlayerName(0, playerNameInputLeft.value);
    hidePlayerNameInput({ target: playerNameInputLeft });
  } else {
    setPlayerName(1, playerNameInputRight.value);
    hidePlayerNameInput({ target: playerNameInputRight });
  }

  showPlayerNames();
  document.removeEventListener("click", handleDocumentClick);
}

function hidePlayerNameInput(event) {
  event.target.classList.add("hidden");

  const containerElement =
    event.target === playerNameInputLeft
      ? playerInfoContainerLeft
      : playerInfoContainerRight;

  containerElement.classList.remove("hidden");
}

function showPlayerNameInput(event) {
  if (!playerNameInputLeft.classList.contains("hidden"))
    hidePlayerNameInput({ target: playerNameInputLeft });
  else hidePlayerNameInput({ target: playerNameInputRight });

  event.target.closest("div").classList.add("hidden");

  // const [index, inputElement] =
  //   event.target === playerNameTextLeft
  //     ? [0, playerNameInputLeft]
  //     : [1, playerNameInputRight];
  // inputElement.value = NAMES[index];
  // inputElement.classList.remove("hidden");
  // inputElement.focus();

  if (event.target === playerNameTextLeft) {
    playerNameInputLeft.value = NAMES[0];
    playerNameInputLeft.classList.remove("hidden");
    playerNameInputLeft.focus();
  } else {
    playerNameInputRight.value = NAMES[1];
    playerNameInputRight.classList.remove("hidden");
    playerNameInputRight.focus();
  }

  document.addEventListener("click", handleDocumentClick);

  // prevent the handleClickOutsideInput being called
  event.stopPropagation();
}

playerNameTextLeft.addEventListener("click", showPlayerNameInput);
playerNameTextRight.addEventListener("click", showPlayerNameInput);
playerNameInputLeft.addEventListener("keydown", handlePlayerNameInputKeyDown);
playerNameInputRight.addEventListener("keydown", handlePlayerNameInputKeyDown);
