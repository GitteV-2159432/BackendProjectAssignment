import { useEffect, useState } from 'react'
import Cards from '../components/Cards.jsx'

const Workouts = () => {
  const [workouts, setWorkouts] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token')

    fetch('http://127.0.0.1:5000/api/workouts?isPublic=true&bookmark=false', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => setWorkouts(result))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      <h1>Workouts</h1>
      <Cards items={workouts} />
    </>
  )
}

export default Workouts
