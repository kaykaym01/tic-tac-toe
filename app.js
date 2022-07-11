let game = (function () {
    /**
     * Starts the game 
     */
    function start() {
        console.log("Game Started");
        displayController.displayBoard(gameboard.board);
    }

    return { start };
})();

let gameboard = (function () {
    let board = [["", "", ""],
                 ["", "", ""],
                 ["", "", ""]];

    /**
     * Adds a marker on the board at position X, Y
     * @param {number} x Row position 
     * @param {number} y Column position
     * @param {string} marker String value for marker
     */
    function addMarker(x, y, marker) {
        board[x][y] = marker;
        displayController.displayBoard(gameboard.board);
        if (_checkForWinner(x, y, marker)){
            console.log("Winner is: " + marker);
        }
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
    return { board, addMarker };
})();

let displayController = (function() {
    /**
     * Can display the gameboard in the console
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

