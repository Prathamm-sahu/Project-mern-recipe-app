import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import { userRouter } from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import { recipeRouter } from './routes/recipeRoutes.js'

dotenv.config()
const port = process.env.PORT || 5000

// MongoDB Connection
connectDB()

const app = express()

// Middlewares
app.use(express.json())   // it will convert data coming from frontend into json
app.use(cors())
app.use(express.urlencoded({ extended: true}))   // It convert from data from frontend in readable form to backend

// Routes

app.use("/api/users", userRouter)
app.use("/api/recipes", recipeRouter)
app.get('/', (req, res) => res.send('Server is Ready'))


// Custom Error Handlers
app.use(notFound)
app.use(errorHandler)


app.listen(port, () => console.log(`Server Started on Port: http://localhost:${port}`))
