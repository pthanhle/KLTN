import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env') })

import connectDB from './config/db.js'
import './models/index.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import seedRoles from './seeders/roleSeed.js'
import { ensureConfigured } from './config/cloudinary.js'
import { initSocket } from './config/socket.js'
import './workers/emailWorker.js'
import './workers/imageWorker.js'

import adminIndexRoutes from './routes/admin/index.route.js'
import clientIndexRoutes from './routes/client/index.route.js'
import staffIndexRoutes from './routes/staff/index.route.js'
import AIroutes from './routes/AI/AI.route.js'
import paymentRoutes from './routes/client/payment.route.js'
import uploadRoutes from './routes/common/upload.route.js'
ensureConfigured()

const initializeDatabase = async () => {
  await connectDB()
  await seedRoles()
}

initializeDatabase()

const app = express()
const server = http.createServer(app)

initSocket(server)

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())


app.use('/api/admin', adminIndexRoutes)
app.use('/api/client', clientIndexRoutes)
app.use('/api/staff', staffIndexRoutes)
app.use('/api/ai', AIroutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/upload', uploadRoutes)


app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID || '')
)

if (process.env.NODE_ENV === 'production') {
  const frontendBuild = path.join(__dirname, '../frontend/build')
  app.use(express.static(frontendBuild))
  app.get('*', (req, res) =>
    res.sendFile(path.join(frontendBuild, 'index.html'))
  )
} else {
  app.get('/', (req, res) => res.send('API is running...'))
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
server.listen(PORT, () =>
  console.log(`Server & WebSocket chạy trên cổng ${PORT}`.yellow.bold)
)