import passport from "passport"; 

import jsonwebtoken from 'jsonwebtoken'
const { verify } = jsonwebtoken 

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' })

  try {
    const token = authHeader.split(' ')[1]
    const decoded = verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Token invalid' })
  }
}

export default authMiddleware

