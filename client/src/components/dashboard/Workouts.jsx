import { useEffect, useState } from 'react'
import useAuth from '../../context/useAuth.js'
import fetchWithAuth from '../../utils/fetchWithAuth.js'
import Workout from './Workout.jsx'

const Workouts = () => {
  const [todaysWorkouts, setTodaysWorkouts] = useState([])
  const { logout } = useAuth()

  useEffect(() => {
    fetchWithAuth('/plans/active/workouts/today', logout).then((res) => {
      res.result ? setTodaysWorkouts(res.result) : setTodaysWorkouts([])
    })
  }, [logout])

  return (
    <ul className="flex flex-col gap-6 text-sm w-80">
      {todaysWorkouts.map((workout) => (
        <Workout key={workout._id} workout={workout} />
      ))}
    </ul>
  )
}

export default Workouts
