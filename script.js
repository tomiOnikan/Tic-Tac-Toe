let playerTurn = false;
let position;
let board = [ ["", "", "" ],
            ["", "", "" ],
            ["", "", "" ]];

function addSymbol(x,y){
    if( board[x][y] == "" ){
        document.getElementById( x + " " + y ).removeAttribute("onclick");
        if( playerTurn == true ){
            board[x][y] = "X";
            position = document.getElementById( x + " " + y );
            position.innerText = "X";
            position.classList.add("X");
            playerTurn = false;
            document.getElementById("status").innerText = "Player 0's turn";
        }else{
            board[x][y] = "O";
            position = document.getElementById( x + " " + y );
            position.innerText = "O";
            position.classList.add("O");
            playerTurn = true;
            document.getElementById("status").innerText = "Player X's turn";
        }
        console.log(board);
        
        let winner = checkGame();
        if (winner) {
            console.log("Game Over Player " + winner + " wins");
            document.getElementById("status").innerText = "Player " + winner + " wins";
            disableBoard();
        }else if( board.flat().every(cell => cell !== "")){
            document.getElementById("status").innerText = "It's a draw!";
        }
    }
}

function resetGame() {
    board = [["", "", ""], ["", "", ""], ["", "", ""]];
    playerTurn = false;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            let cell = document.getElementById(x + " " + y);
            cell.innerText = "";
            cell.classList.remove("X", "O");
            cell.setAttribute("onclick", `addSymbol(${x},${y})`);
        }
    }
    document.getElementById("status").innerText = "Player O starts";
}

function disableBoard() {
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            document.getElementById(x + " " + y).removeAttribute("onclick");
        }
    }
}

function checkGame() { 
    for (let row = 0; row < 3; row++) {
        let symbol = board[row][0];
        if (symbol !== "" && board[row][1] === symbol && board[row][2] === symbol) {
            return symbol;
        }
    }

    for (let col = 0; col < 3; col++) {
        let symbol = board[0][col];
        if (symbol !== "" && board[1][col] === symbol && board[2][col] === symbol) {
            return symbol;
        }
    }

    if (board[1][1] !== "") {
        if (board[0][0] === board[1][1] && board[2][2] === board[1][1]) {
            return board[1][1];
        }
        if (board[0][2] === board[1][1] && board[2][0] === board[1][1]) {
            return board[1][1];
        }
    }

    return null;
}