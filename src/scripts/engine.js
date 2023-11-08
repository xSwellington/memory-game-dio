const emojis = ["🦆", "🦜", "🦚", "🦤", "🐦‍⬛", "🐓", "🐌", "🐛"];
let gameBoard = [];
let openCards = [];
const gameBoardView = document.querySelector(".game");
let timeout = false;
let gameStarted = false;

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function checkMatch() {
  const [card1, card2] = openCards;
  if (card1.innerHTML === card2.innerHTML) {
    card1.classList.add("boxMatch");
    card2.classList.add("boxMatch");
  } else {
    card1.classList.remove("boxOpen");
    card2.classList.remove("boxOpen");
  }
  openCards = [];

  const endgame = gameBoardView.querySelectorAll(".boxMatch");
  if (endgame.length === gameBoard.length) {
    alert("Você venceu!");
  }
  timeout = false;
}

function handleClick() {
  if (timeout || !gameStarted) return;
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }
  if (openCards.length == 2) {
    timeout = true;
    setTimeout(checkMatch, 500);
  }
}

function initializeBoard() {
  gameBoard = shuffle([...emojis, ...emojis]);
  gameBoard.forEach((emoji) => {
    let box = document.createElement("div");
    box.classList.add("item");
    box.innerText = emoji;
    box.onclick = handleClick;
    gameBoardView.appendChild(box);
  });
}

function RevealBoard(toogle) {
  gameBoardView.querySelectorAll(".item").forEach((card) => {
    if (toogle) card.classList.add("boxOpen");
    else card.classList.remove("boxOpen");
  });
}

function initializeGame() {
  gameStarted = false;
  initializeBoard();
  RevealBoard(true);
  setTimeout(() => {
    RevealBoard(false);
    gameStarted = true;
  }, 3000);
}

initializeGame();
