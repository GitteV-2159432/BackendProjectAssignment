import express from 'express'
import router from './routes/index.js'
import setupSwaggerDocs from './config/swagger.js'

const app = express()

app.use(express.json())

app.use('/api', router)

const PORT = process.env.PORT || 5000

setupSwaggerDocs(app, PORT)

app.listen(PORT, () =>
    console.log(
        `API documentation running on http://localhost:${PORT}/api-docs`
    )
)
