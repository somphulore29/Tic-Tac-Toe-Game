let container = document.querySelector(".container");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let mssg = document.querySelector("#mssg");

let turnX = true; //playerX, playerO
let count = 0; //To Track Tie

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

// Reset button
const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    container.style.display = "grid";
}

// Play area
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX) {  //playerX turn
            box.innerText = "X";
            turnX = false;
        } else {   //playerO turn
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        
        // Check tie
        if(count === 9 && !isWinner) { //When count reaches to 9 but Game has no winner Its Tie
            gameTie();
        }
    });
});

// Game tie
const gameTie = () => {
    mssg.innerText = `Game is >"Tie"`;
    msgContainer.classList.remove("hide");
    container.style.display = "none";
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

// Show winner
const showWinner = (winner) => {
    mssg.innerText = `Congratulations Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    container.style.display = "none";
    disableBoxes();
};

// Check winner
const checkWinner = () => {
    for(let pattern of winPatterns) {
        let posi1Val = boxes[pattern[0]].innerText;
        let posi2Val = boxes[pattern[1]].innerText;
        let posi3Val = boxes[pattern[2]].innerText;

        if(posi1Val != "" && posi2Val != "" && posi3Val != "") {
            if(posi1Val === posi2Val && posi2Val === posi3Val) {              
                showWinner(posi1Val);
                return true;
            }
        }
    }
};




resetBtn.addEventListener("click", resetGame);