import { configDotenv } from 'dotenv'

configDotenv()

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong'

  res.status(status).json({
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  })
}

export default errorHandler
