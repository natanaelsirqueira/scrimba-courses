import React from 'react'

import Square from './Square'

const Board = ({ squares, onSquareClick }) => {
  return (
    <div style={style}>
      {squares.map((square, index) => (
        <Square key={index} value={square} onClick={() => onSquareClick(index)} />
      ))}
    </div>
  )
}

const style = {
  border: '4px solid darkblue',
  borderRadius: '10px',
  width: '250px',
  height: '250px',
  margin: '10px auto',
  display: 'grid',
  gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)'
};

export default Board
