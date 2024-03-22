function getNamesLocalStorage() {
  NAMES[0] = localStorage.getItem("PLAYER1_NAME") ?? "X";
  NAMES[1] = localStorage.getItem("PLAYER2_NAME") ?? "O";
}

function setPlayerNamesLocalStorage(name, index) {
  const key = index === 0 ? "PLAYER1_NAME" : "PLAYER2_NAME";
  localStorage.setItem(key, NAMES[index]);
}
