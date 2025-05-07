import { useState } from 'react'
import CheckBoxIcon from '../../components/icons/CheckBoxIcon.jsx'

const Exercise = ({ exercise }) => {
  const [checked, setChecked] = useState(false)

  return (
    <li
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      className="flex items-start gap-2 mt-1 hover:cursor-pointer"
      onClick={() => setChecked((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          setChecked((prev) => !prev)
        }
      }}
      aria-label={`${exercise.name}`}
    >
      <CheckBoxIcon checked={checked} />
      <span>{exercise.name}</span>
    </li>
  )
}

export default Exercise
