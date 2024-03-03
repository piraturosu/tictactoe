const SCORE = { PLAYER1: 0, PLAYER2: 0 };

function storeScore(result) {
  if (result === TURNS.PLAYER1) SCORE.PLAYER1 += 1;
  else if (result === TURNS.PLAYER2) SCORE.PLAYER2 += 1;
}
