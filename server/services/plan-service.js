import Plan from '../models/Plan.js'
import { createGenericService } from './components/generic-service.js'

const planService = createGenericService(Plan)

planService.getAll = async ({ isPublic, bookmark }) => {
  const plans = await Plan.find({ isPublic })

  // TODO: if bookmark == true, filter plans

  return plans
}

export default planService
