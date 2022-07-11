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
     * @param {*} x 
     * @param {*} y 
     * @param {*} marker 
     */
    function addMarker(x, y, marker) {
        board[x][y] = marker;
    }
    return { board, addMarker };
})();

game.start();

