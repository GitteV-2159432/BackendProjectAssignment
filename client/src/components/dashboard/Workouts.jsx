import Workout from './Workout.jsx'

const Workouts = ({ workouts }) => {
  return (
    <ul className="flex flex-col gap-6 text-sm w-80">
      {workouts.length > 0 &&
        workouts.map((workout) => (
          <li key={workout._id}>
            <Workout workout={workout} />
          </li>
        ))}
    </ul>
  )
}

export default Workouts
