import express from 'express'
import { configDotenv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import router from './routes/index.js'
import setupSwaggerDocs from './config/swagger.js'
import connectDB from './config/db.js'
import cors from 'cors'
import passport from "./config/passportConfig.js";

configDotenv()

const app = express()
const PORT = process.env.PORT || 5000

app.use(passport.initialize());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB() 

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true // only if using cookies
}));
// Middleware
app.use(express.json())

// Routes
app.use('/api', router)

// Swagger docs
setupSwaggerDocs(app, PORT)

const filePath = path.join(__dirname, '../client/dist', 'index.html');
console.log('Serving index.html from:', filePath);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () =>
  console.log(`API documentation running on http://localhost:${PORT}/api-docs`)
)
