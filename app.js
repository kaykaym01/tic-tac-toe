const playerFactory = (name, marker) => {
    /**
     * Player takes their turn and adds a marker to the gameboard
     * @param {*} gameboard 
     */
    function takeTurn(gameboard){
        let posX = prompt("Select the row position of your marker");
        let posY = prompt("Select the column position of your marker");
        console.log(name + " Turn");
        gameboard.addMarker(parseInt(posX), parseInt(posY), marker); 
    }

    /**
     * Player changes their name from name to newName
     * @param {*} newName 
     */
    function setName(newName){
        name = newName;
    }

    return {name, marker, takeTurn};
}

let game = (function () {
    /**
     * Starts the game 
     */
    function start() {
        console.log("Game Started");
        gameboard.resetBoard();
        displayController.displayBoard(gameboard.board);
    }

    /**
     * Restarts the game
     */
    function restart(){
        console.log("Restarting game");
        start();
    }

    return { start, restart};
})();

let gameboard = (function () {
    let board = [];
    let _boardRows = 3;
    let _boardCols = 3;
    let _maxMoves = _boardCols * _boardRows;
    let _movesTaken = 0;
    let _gameOver = false;

    /**
     * Adds a marker on the board at position X, Y
     * @param {number} x Row position 
     * @param {number} y Column position
     * @param {string} marker String value for marker
     */
    function addMarker(x, y, marker) {
        board[x][y] = marker;
        _movesTaken++;
        displayController.displayBoard(gameboard.board);
        if (_checkForWinner(x, y, marker)){
            console.log("Winner is: " + marker);
            _gameOver = true;
        } else if (_checkForTiedGame()){
            console.log("Draw");
            _gameOver = true;
        }
    }

    /**
     * 
     * @returns true if the game has ended in a tie
     */
    function _checkForTiedGame() {
        return _maxMoves == _movesTaken;
    }

    /**
     * 
     * @param {*} lastX 
     * @param {*} lastY 
     * @param {*} marker 
     * @returns 
     */
    function _checkForWinner(lastX, lastY, marker){
        let n = board.length;
        
        // check for row winner
        for (let i = 0; i < n; i++){
            if (board[lastX][i] != marker){
                break;
            }
            if (i == n-1){
                return true;
            }
        }

        // check for column winner
        for (let i = 0; i < n; i++){
            if (board[i][lastY] != marker){
                break;
            }
            if (i == n-1){
                return true;
            }
        }

        //if on positive diagonal, check for diagonal winner
        if (lastX == lastY){
            for (let i = 0; i < n; i++){
                if (board[i][i] != marker){
                    break;
                }
                if (i == n-1){
                    return true;
                }
            }
        }

        // if on anti-diagonal, check for diagonal winner
        if (lastX+lastY==n-1){
            for (let i = 0; i < n; i++){
                if (board[i][n-1-i] != marker){
                    break;
                }
                if (i == n-1){
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Resets the gameboard to be a 3x3 empty array
     */
    function resetBoard(){
        board.splice(0, board.length);
        let n = 3;
        for (let i = 0; i < n; i++){
            let row = [];
            for (let j = 0; j < n; j++){
                row.push("");
            }
            board.push(row);
        }
    }
    return { board, addMarker, resetBoard};
})();

let displayController = (function() {
    /**
     * Displays the gameboard in the console
     * @param {*} gameboard 
     */
    function displayBoard(board){
        let n = board.length;
        let display = "";
        for (let i = 0; i < n; i++){
            let row="";
            for (let j = 0; j < n; j++){
                row += (board[i][j]) ? board[i][j] : "_";
                if (j < n-1){
                    row += "  ";
                }
            }
            display += row;
            if (i < n-1){
                display += "\n";
            }
        }
        console.log(display)
    }
    return {displayBoard};
})();

game.start();

