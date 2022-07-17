const playerFactory = (name, marker) => {
    /**
     * Player changes their name from name to newName
     * @param {*} newName 
     */
    function setName(newName) {
        name = newName;
    }

    return { name, marker, setName };
}

let game = (function () {
    let _player1 = playerFactory("Player 1", "X");
    let _player2 = playerFactory("Player 2", "O");

    /**
     * Starts the game 
     */
    function start() {
        console.log("Game Started");
        gameboard.resetBoard();
        displayController.clearBoard();
        displayController.displayBoard(gameboard);
        gameboard.setCurrentPlayer(_player1);
        gameboard.setNextPlayer(_player2);
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

    return { start, restart, end };
})();

let gameboard = (function () {
    let _board = [];
    let _numRows = 3;
    let _numCols = 3;
    let _maxMoves = _numRows * _numCols;
    let _movesTaken = 0;
    let _gameOver = false;
    let _currentPlayer;
    let _nextPlayer;

    /**
     * Sets the current player to be player
     * @param {*} player The player whose turn it will be 
     */
    function setCurrentPlayer(player) {
        console.log(player.name + "'s turn");
        _currentPlayer = player;
    }

    /**
     * Sets the next player to be player
     * @param {*} player THe player whose turn is coming up after _currentPlayer
     */
    function setNextPlayer(player) {
        _nextPlayer = player;
    }

    /**
     * Swaps _currentPlayer and _nextPlayer
     */
    function _changeTurns() {
        let tempPlayer = _currentPlayer;
        setCurrentPlayer(_nextPlayer);
        setNextPlayer(tempPlayer);
    }

    /**
     * Gets the number of rows in the gameboard
     * @returns the number of rows in the gameboard
     */
    function getNumRows() {
        return _numRows;
    }

    /**
     * Gets the number of columnsin the gameboard
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
     * Determines whether the cell at position _board[row][col] is empty
     * @param {*} row The row index
     * @param {*} col The column index
     * @returns true if the cell at position _board[row][col] is empty, false otherwise
     */
    function _isCellEmpty(row, col) {
        return (_board[row][col] == "") ? true : false;
    }

    /**
     * Adds a marker on the board at position X, Y
     * @param {number} x Row position 
     * @param {number} y Column position
     */
    function addMarker(x, y) {
        if (_gameOver) {
            console.log("Game is over. Start new game to continue playing.")
        }
        else if (!_currentPlayer) {
            console.log("Current player not yet set.");
        } 
        else if (!_isCellEmpty(x, y)){
            console.log("Must choose an empty cell")
        }
        else {
            _board[x][y] = _currentPlayer.marker;
            _movesTaken++;
            displayController.updateCell(gameboard, x, y);
            if (_checkForWinner(x, y, _currentPlayer.marker)) {
                console.log("Winner is: " + _currentPlayer.name);
                _gameOver = true;
            } else if (_checkForTiedGame()) {
                console.log("Draw");
                _gameOver = true;
            } else {
                _changeTurns();
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
     * Checks if there is winner based on the last move
     * @param {*} lastX The last row index
     * @param {*} lastY The last column index
     * @param {*} marker The last marker placed
     * @returns true if the marker at _board[lastX][lastY] is a win
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
        _movesTaken = 0;
        _currentPlayer = null;
        _nextPlayer = null;
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

    /**
     * Whether or not the game is over
     * @returns true if the game is over, false otherwise
     */
    function isGameOver() {
        return _gameOver;
    }

    return { addMarker, resetBoard, endGame, getNumCols, getNumRows, getMarkerAt, isGameOver, setCurrentPlayer, setNextPlayer };
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
                gridCell.addEventListener('click', _gridCellClicked.bind(this, gameboard, gridCell));
                gridRow.append(gridCell);
            }
            ticTacToeGrid.append(gridRow);
        }
    }

    /**
     * 
     */
    function clearBoard() {
        const ticTacToeGrid = document.querySelector(".tic-tac-toe-grid");
        while (ticTacToeGrid.firstChild){
            ticTacToeGrid.removeChild(ticTacToeGrid.firstChild);
        }
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

    /**
     * When the grid cell is clicked, if it is at an empty position,
     * the gameboard board is updated with the marker of _currentPlayer
     * and the display is updated
     * 
     * @param {*} gameboard The gameboard with the underlying board array
     * @param {*} gridCell The HTML grid cell element that was just clicked
     */
    function _gridCellClicked(gameboard, gridCell) {
        let row = gridCell.getAttribute("data-row");
        let col = gridCell.getAttribute("data-col");
        gameboard.addMarker(row, col);
        updateCell(gameboard, row, col);
    }
    return { displayBoard, updateCell , clearBoard};
})();

game.start();

