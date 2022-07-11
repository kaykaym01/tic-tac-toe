let game = (function () {
    /**
     * Starts the game 
     */
    function start() {
        console.log("Game Started");
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
    }
    return { board, addMarker };
})();

let displayController = (function() {
    /**
     * Can display the gameboard
     * @param {*} gameboard 
     */
    function displayBoard(board){
        console.log(board);
    }
    return {displayBoard};
})();

game.start();

