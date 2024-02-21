let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msgCont");
let msg = document.querySelector(".msg");
let win= new Audio("win.mp3");

let count = 0;
let turnX = true;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = () => {
  turnX = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  count = 0;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.style.color = "green";
      box.innerText = "X";
      turnX = false;
    } else {
      box.style.color = "maroon";
      box.innerText = "O";
      turnX = true;
    }
    count++;
    if (count == 9) {
      showDraw();
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
  resetBtn.classList.add("hide");
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
  resetBtn.classList.remove("hide");
};

const showWinner = (pos1Val,pos2Val,pos3Val) => {
  win.play();
  msg.innerText = `Congratulations, Winner is ${pos1Val}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const showDraw = () => {
  msg.innerText = `Oops! it's a Draw`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log("winner", pos1Val);
        showWinner(pos1Val,pos2Val,pos3Val);
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
