import { useState } from 'react'
import ExpandCircleIcon from '../icons/ExpandCircleIcon'
import Exercises from './Exercises'

const Workout = ({ workout }) => {
  const [expanded, setExpanded] = useState(false)
  const [needsExpansion, setNeedsExpansion] = useState(false)

  return (
    <div className="bg-[#40434E] rounded-2xl list-none w-full">
      <div className="px-5 py-3.5">
        <h3
          className={`text-lg p-0 ${
            workout.exercises.length === 0 ? 'text-center' : ''
          }`}
        >
          {workout.name}
        </h3>

        {workout.exercises.length > 0 && (
          <Exercises
            exercises={workout.exercises}
            expanded={expanded}
            setNeedsExpansion={setNeedsExpansion}
          />
        )}
      </div>

      {needsExpansion && (
        <button
          className="flex justify-center w-full py-2 bg-[#07070760]"
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={`Expand the workout '${workout.name}' with its exercises to full size.`}
        >
          <ExpandCircleIcon expanded={expanded} />
        </button>
      )}
    </div>
  )
}

export default Workout
