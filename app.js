const playerFactory = (name, marker) => {
    /**
     * Player takes their turn and adds a marker to the gameboard
     * @param {*} gameboard The gameboard for players to take a turn on
     */
    function takeTurn(gameboard) {
        let posX = prompt("Select the row position of your marker");
        let posY = prompt("Select the column position of your marker");
        console.log(name + " Turn");
        gameboard.addMarker(parseInt(posX), parseInt(posY), marker);
    }

    /**
     * Player changes their name from name to newName
     * @param {*} newName 
     */
    function setName(newName) {
        name = newName;
    }

    return { name, marker, takeTurn, setName };
}

let game = (function () {
    /**
     * Starts the game 
     */
    function start() {
        console.log("Game Started");
        gameboard.resetBoard();
        displayController.displayBoard(gameboard);
    }

    /**
     * Restarts the game
     */
    function restart() {
        console.log("Restarting game");
        start();
    }

    /**
     * Ends the game
     */
    function end() {
        console.log("Ending game");
        gameboard.endGame();
    }

    return { start, restart };
})();

let gameboard = (function () {
    let _board = [];
    let _numRows = 3;
    let _numCols = 3;
    let _maxMoves = _numRows * _numCols;
    let _movesTaken = 0;
    let _gameOver = false;

    /**
     * 
     * @returns the number of rows in the gameboard
     */
    function getNumRows() {
        return _numRows;
    }

    /**
     * 
     * @returns the number of columns in the gameboard
     */
    function getNumCols() {
        return _numCols;
    }

    /**
     * Gets the marker at a specific position
     * @param {*} row The row index
     * @param {*} col The column index
     * @returns The marker present at board[row][col], if present. Otherwise a non-breaking space.
     */
    function getMarkerAt(row, col) {
        return (_board[row][col]) ? _board[row][col] : '\xa0';
    }

    /**
     * Adds a marker on the board at position X, Y
     * @param {number} x Row position 
     * @param {number} y Column position
     * @param {string} marker String value for marker
     */
    function addMarker(x, y, marker) {
        if (_gameOver) {
            console.log("Game is over. Start new game to continue playing.")
        } else {
            _board[x][y] = marker;
            _movesTaken++;
            displayController.updateCell(gameboard, x, y);
            if (_checkForWinner(x, y, marker)) {
                console.log("Winner is: " + marker);
                _gameOver = true;
            } else if (_checkForTiedGame()) {
                console.log("Draw");
                _gameOver = true;
            }
        }
    }

    /**
     * Checks if the game is tied 
     * @returns true if the number of max moves has been made (tied game)
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
    function _checkForWinner(lastX, lastY, marker) {
        // check for row winner
        for (let i = 0; i < _numCols; i++) {
            if (_board[lastX][i] != marker) {
                break;
            }
            if (i == _numCols - 1) {
                return true;
            }
        }

        // check for column winner
        for (let i = 0; i < _numRows; i++) {
            if (_board[i][lastY] != marker) {
                break;
            }
            if (i == _numRows - 1) {
                return true;
            }
        }

        //if on positive diagonal, check for diagonal winner
        if (lastX == lastY) {
            for (let i = 0; i < _numCols; i++) {
                if (_board[i][i] != marker) {
                    break;
                }
                if (i == _numCols - 1) {
                    return true;
                }
            }
        }

        // if on anti-diagonal, check for diagonal winner
        if (lastX + lastY == _numCols - 1) {
            for (let i = 0; i < _numCols; i++) {
                if (_board[i][_numCols - 1 - i] != marker) {
                    break;
                }
                if (i == _numCols - 1) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Resets the gameboard to be a 3x3 empty array
     */
    function resetBoard() {
        _gameOver = false;
        _board.splice(0, _numRows);
        for (let i = 0; i < _numRows; i++) {
            let row = [];
            for (let j = 0; j < _numCols; j++) {
                row.push("");
            }
            _board.push(row);
        }
    }

    /**
     * Ends the game
     */
    function endGame() {
        _gameOver = true;
    }
    return { addMarker, resetBoard, endGame, getNumCols, getNumRows, getMarkerAt };
})();

let displayController = (function () {
    /**
     * Displays the gameboard in the console
     * @param {*} gameboard 
     */
    function displayBoard(gameboard) {
        let numRows = gameboard.getNumRows();
        let numCols = gameboard.getNumCols();
        const ticTacToeGrid = document.querySelector(".tic-tac-toe-grid");
        for (let i = 0; i < numRows; i++) {
            let gridRow = document.createElement("div");
            gridRow.classList.add("grid-row");
            for (let j = 0; j < numCols; j++) {
                let gridCell = document.createElement("div");
                gridCell.classList.add("grid-cell");
                gridCell.setAttribute("data-row", i);
                gridCell.setAttribute("data-col", j);
                gridCell.textContent = gameboard.getMarkerAt(i, j);
                gridRow.append(gridCell);
            }
            ticTacToeGrid.append(gridRow);
        }
        console.log("BLOOP");
    }

    /**
     * Updates the value in the gameboard display at position row, col
     * @param {*} gameboard 
     * @param {number} row
     * @param {number} cell
     */
    function updateCell(gameboard, row, col) {
        let cell = document.querySelector("[data-row=" + CSS.escape(row) + "][data-col=" + CSS.escape(col) + "]");
        cell.textContent = gameboard.getMarkerAt(row, col);
    }
    return { displayBoard, updateCell };
})();

game.start();

