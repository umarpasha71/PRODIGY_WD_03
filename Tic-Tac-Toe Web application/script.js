document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('[data-cell]');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (clickedCell, clickedCellIndex) => {
        if (gameState[clickedCellIndex] !== '' || !gameActive) return;

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        // Add class to style X and O
        clickedCell.classList.add(currentPlayer);

        if (checkWin()) {
            status.textContent = `${currentPlayer} has won!`;
            gameActive = false;
            return;
        }
        if (checkDraw()) {
            status.textContent = 'It\'s a draw!';
            gameActive = false;
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    };

    const checkWin = () => {
        return winningConditions.some((condition) => {
            return condition.every((index) => {
                return gameState[index] === currentPlayer;
            });
        });
    };

    const checkDraw = () => {
        return gameState.every((cell) => {
            return cell !== '';
        });
    };

    const handleRestartGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O'); // Remove X and O classes
        });
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            handleCellClick(cell, index);
        });
    });

    restartButton.addEventListener('click', handleRestartGame);
});
