import planService from '../services/planService.js'

const getPlans = async (req, res) => {
  return res.json(await planService.getAll())
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
