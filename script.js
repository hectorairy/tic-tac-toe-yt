let currentPlayer = "X";
const gameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let xWins = 0;
let oWins = 0;
let ties = 0;

const togglePlayer = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const markCell = (buttonElement, x, y) => {
  if (!buttonElement.innerHTML && !isGameOver()) {
    buttonElement.innerHTML = currentPlayer;
    gameBoard[x][y] = currentPlayer;

    if (!checkGameStatus()) {
      togglePlayer();
    }
  }
};

const resetGame = () => {
  gameBoard.forEach((row) => row.fill(null));
  currentPlayer = "X";
  document.querySelectorAll("button").forEach((cell) => (cell.innerHTML = ""));
};

const checkGameStatus = () => {
  if (isWinner()) {
    setTimeout(() => {
      alert(`${currentPlayer} wins!`);
      resetGame();
    }, 100);
    return true;
  }

  if (isGameOver()) {
    setTimeout(() => {
      alert("It's a tie!");
      resetGame();
    }, 100);
    return true;
  }

  return false;
};

const isGameOver = () => {
  const boardFull = gameBoard.flat().every((cell) => cell);
  if (boardFull) {
    ties++;
    document.getElementById("ties").textContent = ties;
  }
  return boardFull;
};

const isWinner = () => {
  const winningPatterns = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [1, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  const hasWon = winningPatterns.some((pattern) =>
    pattern.every(([x, y]) => gameBoard[x][y] === currentPlayer)
  );

  if (hasWon) updateWinnerCount();

  return hasWon;
};

const updateWinnerCount = () => {
  currentPlayer === "X" ? xWins++ : oWins++;
  document.getElementById("xWins").textContent = xWins;
  document.getElementById("oWins").textContent = oWins;
};
