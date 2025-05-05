import { useEffect, useState } from 'react'
import useAuth from '../context/useAuth.js'
import fetchWithAuth from '../utils/fetchWithAuth.js'
import PageContainer from '../components/PageContainer.jsx'

const Dashboard = () => {
  const [todaysWorkouts, setTodaysWorkouts] = useState()
  const { logout } = useAuth()

  useEffect(() => {
    fetchWithAuth('/plans/active/workouts/today', logout).then((res) => {
      res.result ? setTodaysWorkouts(res.result) : setTodaysWorkouts([])
      console.log(res.result)
    })
  }, [logout])

  return (
    <PageContainer heading={'Dashboard'}>
      <h2 className="font-[Abril_Fatface] text-xl">Todays Workout</h2>
    </PageContainer>
  )
}

export default Dashboard
