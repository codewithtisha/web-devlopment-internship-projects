var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = [];

window.onload = function () {
    setGame();
};

function setGame() {
    board = [];
    currColumns = [5,5,5,5,5,5,5];

    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {

            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r + "-" + c;
            tile.classList.add("tile");

            tile.addEventListener("click", setPiece);
            boardDiv.appendChild(tile);
        }
        board.push(row);
    }

    gameOver = false;
    currPlayer = playerRed;
    document.getElementById("winner").innerText = "";
}

function setPiece() {
    if (gameOver) return;

    let coords = this.id.split("-");
    let c = parseInt(coords[1]);

    let r = currColumns[c];
    if (r < 0) return;

    board[r][c] = currPlayer;

    let tile = document.getElementById(r + "-" + c);

    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    currColumns[c]--;

    checkWinner();
}

function checkWinner() {

    // Horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r][c+1] &&
                board[r][c] == board[r][c+2] &&
                board[r][c] == board[r][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r+1][c] &&
                board[r][c] == board[r+2][c] &&
                board[r][c] == board[r+3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Diagonal 
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r+1][c+1] &&
                board[r][c] == board[r+2][c+2] &&
                board[r][c] == board[r+3][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Diagonal 
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ' &&
                board[r][c] == board[r-1][c+1] &&
                board[r][c] == board[r-2][c+2] &&
                board[r][c] == board[r-3][c+3]) {
                setWinner(r, c);
                return;
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");

    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins!";
    } else {
        winner.innerText = "Yellow Wins!";
    }

    gameOver = true;
}

// Reset Function
function resetGame() {
    setGame();
}