import { useState } from 'react'
import CheckBoxIcon from '../../components/icons/CheckBoxIcon.jsx'

const Exercise = ({ exercise }) => {
  const [checked, setChecked] = useState(false)

  return (
    <li
      className="flex items-start gap-2 mt-1 hover:cursor-pointer"
      onClick={() => setChecked((prev) => !prev)}
    >
      <CheckBoxIcon checked={checked} />
      <span>{exercise.name}</span>
    </li>
  )
}

export default Exercise
