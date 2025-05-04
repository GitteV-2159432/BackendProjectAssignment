import CardPageContainer from '../components/CardPageContainer.jsx'
import endpoints from '../enums/endpoints.js'

const Exercises = () => {
  return (
    <CardPageContainer
      heading={'Exercises'}
      endpoint={`/${endpoints.exercises}`}
    />
  )
}

export default Exercises
