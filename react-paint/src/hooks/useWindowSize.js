import { useState, useEffect } from 'react'

export default function useWindowSize(callback = () => {}) {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight])

  useEffect(() => {
    const handleResize = () => {
      callback()
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [callback])

  return windowSize
}
