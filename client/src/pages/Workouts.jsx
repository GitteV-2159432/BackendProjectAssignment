import CardPageContainer from '../components/CardPageContainer'
import endpoints from '../enums/endpoints'

const Workouts = () => {
  return (
    <CardPageContainer
      heading={'Workouts'}
      endpoint={`/${endpoints.workouts}`}
    />
  )
}

export default Workouts
