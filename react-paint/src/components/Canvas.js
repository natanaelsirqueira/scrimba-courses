import React, { useRef, useState, useEffect, useCallback } from 'react'

import useWindowSize from '../hooks/useWindowSize'

export default function Canvas({ color, ...props }) {
  const canvasRef = useRef()

  const [context, setContext] = useState(null)
  const [drawing, setDrawing] = useState(false)

  const [width, height] = useWindowSize()

  useEffect(() => {
    setContext(canvasRef.current.getContext('2d'))
  }, [height, width])

  const handleMouseMove = useCallback((e) => {
    const coords = [
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    ]

    if (drawing) {
      context.lineTo(...coords)
      context.stroke()
    }

    if (props.handleMouseMove) {
      props.handleMouseMove(...coords)
    }
  }, [context, drawing, props])

  const startDrawing = useCallback((e) => {
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.lineWidth = 10
    context.strokeStyle = color
    context.beginPath();

    context.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    )

    setDrawing(true)
  }, [context, color])

  const stopDrawing = useCallback(() => {
    context.closePath()
    setDrawing(false)
  }, [context])

  return (
    <canvas
      ref={canvasRef}
      width={props.width || width}
      height={props.height || height}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onMouseMove={handleMouseMove}
    />
  )
}
