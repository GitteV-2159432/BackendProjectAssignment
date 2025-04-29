import { sanitizeBooleanQueryParam, sanitizeObjectIdQueryParam } from '../middleware/sanitization/query-param-sanitization.js'
import userService from '../services/user-service.js'
import mongoose from 'mongoose'

const getUsers = async (req, res) => {  
  //Check if the user is an admin 
  await userService.checkPermission(req.userObjectId)

  //Return only certain information of the user
  return res.json(await userService.getAll({}, {},  {
    firstName: 1,
    lastName: 1,
    email: 1,
    type: 1,
    bookmarks: 1,
  }))
}

const getUser = async (req, res) => {
  //Check if the user is an admin or the user is the same as the one being requested
  await userService.checkPermission(req.userObjectId, req.params.id)

  //return only certain information of the user
  if(req.userObjectId.equals(req.params.id)){
    const user = await userService.getById(req.params.id, {
      firstName: 1,
      lastName: 1,
      email: 1,
      passwordHash: 1,
      type: 1,
      bookmarks: 1,
    })
    return res.json(user)
  } else{
    const user = await userService.getById(req.params.id, {
      firstName: 1,
      lastName: 1,
      email: 1,
      type: 1,
      bookmarks: 1,
    })
    return res.json(user)
  }
}


const deleteUser = async (req, res) => {
  await exerciseService.checkPermission(req.params.id, req.userObjectId)
  await exerciseService.remove(req.params.id)

  return res.status(204).send()
}

const updateUser = async (req, res) => {
  await exerciseService.checkPermission(req.params.id, req.userObjectId);
  
  const updatedExercise = await exerciseService.update(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    muscles: req.body.muscles,
    muscles_secondary: req.body.muscles_secondary,
    equipment: req.body.equipment,
    images: req.body.images,
  })
  
  return res.json(updatedExercise)
}

export { getUsers, getUser, deleteUser, updateUser }
