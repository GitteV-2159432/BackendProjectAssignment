import { useEffect, useState } from 'react'
import ExpandCircleIcon from '../icons/ExpandCircleIcon'
import Exercises from './Exercises'

const Workout = ({ workout }) => {
  const [expanded, setExpanded] = useState(false)
  const [needsExpansion, setNeedsExpansion] = useState(false)

  useEffect(() => {}, [])

  return (
    <li className="bg-[#40434E] rounded-2xl">
      <div className="px-5 py-3.5">
        <h3 className="text-lg p-0">{workout.name}</h3>

        <Exercises
          exercises={workout.exercises}
          expanded={expanded}
          setNeedsExpansion={setNeedsExpansion}
        />
      </div>

      {needsExpansion && (
        <button
          className="flex justify-center w-full py-2 bg-[#07070760]"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <ExpandCircleIcon expanded={expanded} />
        </button>
      )}
    </li>
  )
}

export default Workout
