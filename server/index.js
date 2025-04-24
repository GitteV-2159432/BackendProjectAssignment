import express from 'express'
import { configDotenv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import router from './routes/index.js'
import connectDB from './config/db.js'
import cors from 'cors'
import errorHandler from './middleware/error-handler.js'

configDotenv()

const app = express()
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

connectDB()

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // your frontend origin
    credentials: true, // only if using cookies
  })
)
// Middleware
app.use(express.json())

// Routes
app.use('/api', router)

// Error handler middleware
app.use(errorHandler)

const filePath = path.join(__dirname, '../client/dist', 'index.html')
console.log('Serving index.html from:', filePath)

app.use(express.static(path.join(__dirname, '../client/dist')))

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
