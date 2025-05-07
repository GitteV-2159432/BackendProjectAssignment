import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../context/useAuth.js'
import fetchWithAuth from '../../utils/fetchWithAuth.js'
import Workout from './Workout.jsx'
import Workouts from './Workouts.jsx'

const TodaysSession = () => {
  const [todaysWorkouts, setTodaysWorkouts] = useState([])
  const [message, setMessage] = useState('')
  const { logout } = useAuth()

  useEffect(() => {
    fetchWithAuth('/plans/active/workouts/today', logout).then((res) => {
      if (res.error) {
        setTodaysWorkouts([])
        setMessage(res.error)
        return
      }

      setTodaysWorkouts(res.result || [])
    })
  }, [logout])

  return (
    <>
      {message && (
        <div className="flex flex-col justify-center">
          <p className="mb-6 text-sm text-center">{message}</p>
          <Link
            to={'/plans'}
            className="text-center rounded-full px-3 py-2 mb-6 mx-auto w-40 bg-[#FDCFF3] hover:bg-[#C297B8] text-[#070707] font-medium transition-colors duration-200"
          >
            Search plans
          </Link>
        </div>
      )}
      {!message && todaysWorkouts.length === 0 && (
        <Workout workout={{ name: 'Rest Day', exercises: [] }} />
      )}
      {todaysWorkouts.length > 0 && (
        <>
          <button
            aria-label="Start your workout session now."
            className="rounded-full px-3 py-2 mb-6 w-80 bg-[#FDCFF3] hover:bg-[#C297B8] text-[#070707] font-medium transition-colors duration-200"
          >
            Start now
          </button>
          <Workouts workouts={todaysWorkouts} />
        </>
      )}
    </>
  )
}

export default TodaysSession
