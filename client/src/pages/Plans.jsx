import CardPageContainer from '../components/CardPageContainer.jsx'
import endpoints from '../enums/endpoints.js'

const Plans = () => {
  return (
    <CardPageContainer heading={'Plans'} endpoint={`/${endpoints.plans}`} />
  )
}

export default Plans
