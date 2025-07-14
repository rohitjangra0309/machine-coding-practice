import React, { useState } from "react";

const TicTacToe = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = isXTurn ? "X" : "O";
    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);

    const win = checkWinner(updatedBoard);
    if (win) {
      setWinner(win);
    }
  };

  const checkWinner = (b) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a];
      }
    }

    if (!b.includes(null)) return "Draw";

    return null;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div style={styles.container}>
      <h2>Tic Tac Toe</h2>
      <div style={styles.board}>
        {board.map((cell, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            style={styles.cell}
          >
            {cell}
          </div>
        ))}
      </div>
      <h3>
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `Winner: ${winner}`
          : `Turn: ${isXTurn ? "X" : "O"}`}
      </h3>
      <button onClick={resetGame} style={styles.button}>
        Reset
      </button>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "sans-serif",
    textAlign: "center",
    marginTop: "20px",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 80px)",
    gridTemplateRows: "repeat(3, 80px)",
    gap: "5px",
    justifyContent: "center",
    margin: "20px auto",
  },
  cell: {
    width: "80px",
    height: "80px",
    backgroundColor: "#f0f0f0",
    fontSize: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "2px solid #444",
  },
  button: {
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default TicTacToe;
