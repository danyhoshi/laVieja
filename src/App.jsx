import "./App.css";
import { useState } from "react";
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
function Board({ turn, squares, onPlay, isHistory }) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [turn, setTurn] = useState(true);

  // function handleClick(ii) {
  //   const nextSquares = squares.slice();
  //   if (squares[ii] || hasWinner()) {
  //     return;
  //   }
  //   nextSquares[ii] = turn ? "X" : "O";
  //   setSquares(nextSquares);
  //   setTurn((prevState) => !prevState);
  // }

  function handleClick(ii) {
    if (hasWinner(squares) || squares[ii] || isHistory) {
      return;
    }
    const nextSquares = squares.slice();
    if (turn) {
      nextSquares[ii] = "X";
    } else {
      nextSquares[ii] = "O";
    }
    onPlay(nextSquares);
  }
  function hasWinner(squares) {
    const winnerCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let ii = 0; ii < 8; ii++) {
      let [a, b, c] = winnerCases[ii];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  const winner = hasWinner(squares);
  let status;
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente Jugador: " + (turn ? "X" : "O");
  }
  return (
    <>
      <p style={{ color: "#e7d9d9" }}>{status}</p>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setXIsNext((prevState) => !prevState);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Ir al movimiento #" + move;
    } else {
      description = "Ir al inicio del juego";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board
          turn={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          isHistory={history.length - 1 > currentMove}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
