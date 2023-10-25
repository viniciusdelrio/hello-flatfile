import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './src/api/routes'
import { errorMiddleware } from './src/api/middlewares/index'
import dbInit from './src/db/init'

dotenv.config()
dbInit()

const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('', routes)
app.use(errorMiddleware)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`[Server]: Server is running at http://localhost:${port}`);
})