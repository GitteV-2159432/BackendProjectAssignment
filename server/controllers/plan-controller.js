import planService from '../services/plan-service.js'

const getPlans = async (req, res) => {
  const { isPublic, bookmark } = req.query

  return res.json(await planService.getAll({ isPublic, bookmark }))
}

const getPlan = async (req, res) => {
  // TODO
}

const addPlan = async (req, res) => {
  // TODO
}

const updatePlan = async (req, res) => {
  // TODO
}

const deletePlan = async (req, res) => {
  // TODO
}

export { getPlans, getPlan, addPlan, updatePlan, deletePlan }
