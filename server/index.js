import express from 'express'
import { configDotenv } from 'dotenv'

import router from './routes/index.js'
import setupSwaggerDocs from './config/swagger.js'
import connectDB from './config/db.js'
import { exerciseService } from './services/exerciseService.js'

configDotenv()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()
exerciseService.populateExercises()

// Middleware
app.use(express.json())

// Routes
app.use('/api', router)

// Swagger docs
setupSwaggerDocs(app, PORT)

app.listen(PORT, () =>
  console.log(`API documentation running on http://localhost:${PORT}/api-docs`)
)
