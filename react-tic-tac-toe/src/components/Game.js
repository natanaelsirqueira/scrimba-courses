import React, { useState } from 'react'

import Board from './Board'

const calculateWinner = (squares) => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [stepNumber, setStepNumber] = useState(0)
  const [nextPlayerIsX, setNextPlayerIsX] = useState(true)

  const winner = calculateWinner(history[stepNumber])

  const handleClick = (clickedSquare) => {
    const timeInHistory = history.slice(0, stepNumber + 1);

    const current = timeInHistory[stepNumber];

    const squares = [...current];

    if (winner || squares[clickedSquare]) return;

    squares[clickedSquare] = nextPlayerIsX ? 'X' : 'O';

    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setNextPlayerIsX(state => !state)
  }

  const jumpTo = step => {
      setStepNumber(step);
      setNextPlayerIsX(step % 2 === 0)
  };

  const renderMoves = () => (
    history.map((_step, move) => {
      const destination = move ? `Go to move#${move}` : 'Go to start';

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>
            {destination}
          </button>
        </li>
      )
    })
  )

  return (
    <>
      <Board squares={history[stepNumber]} onSquareClick={handleClick} />

      <div style={{ width: '200px', margin: '20px auto' }}>
        <p>{winner ? `Winner: ${winner}` : `Next Player: ${(nextPlayerIsX ? 'X' : 'O')}`}</p>

        {renderMoves()}
      </div>
    </>
  )
}

export default Game
