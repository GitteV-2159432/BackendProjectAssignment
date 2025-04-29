import { sanitizeBooleanQueryParam, sanitizeObjectIdQueryParam } from '../middleware/sanitization/query-param-sanitization.js'
import userService from '../services/user-service.js'
import mongoose from 'mongoose'


// GET /api/users
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

// GET /api/users/:id
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

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  //Check if the user is an admin or the user is the same as the one being deleted
  await userService.checkPermission(req.userObjectId, req.params.id)

  //Delete the user
  await userService.remove(req.params.id)

  return res.status(204).send()
}


// PATCH /api/users/:id
const updateUser = async (req, res) => {
  //Check if the user is an admin or the user is the same as the one being updated
  await userService.checkPermission(req.userObjectId, req.params.id)

  const updatedUser = await userService.update(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    type: req.body.type,
  })

  
  return res.json(updatedUser)
}

export { getUsers, getUser, deleteUser, updateUser }
