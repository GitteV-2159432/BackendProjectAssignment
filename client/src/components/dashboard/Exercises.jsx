import { useRef, useEffect } from 'react'
import Exercise from './Exercise'

const Exercises = ({ exercises, expanded, setNeedsExpansion }) => {
  const contentRef = useRef(null)

  useEffect(() => {
    const contentElement = contentRef.current
    if (contentElement) {
      const isOverflowing =
        contentElement.scrollHeight > contentElement.clientHeight
      setNeedsExpansion(isOverflowing)
    }
  }, [])

  return (
    <ul
      ref={contentRef}
      className={`${expanded ? '' : 'max-h-[120px]'} ml-2 overflow-hidden`}
    >
      {exercises.map((exercise) => (
        <Exercise key={exercise._id} exercise={exercise} />
      ))}
    </ul>
  )
}

export default Exercises
