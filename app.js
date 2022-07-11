let game = (function () {
    function start() {
        console.log("Game Started");
    }

    return { start };
})();

let gameboard = (function () {
    let board = [["", "", ""],
                 ["", "", ""],
                 ["", "", ""]];

    function addMarker(x, y, marker) {
        board[x][y] = marker;
    }
    return { board, addMarker };
})();

game.start();

