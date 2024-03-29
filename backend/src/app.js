const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const cors = require('cors')
const express = require('express')
// const session = require('express-session')
const bodyParser = require('body-parser')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
// const path = require('path')
const { ready, error, debug } = require('./utils/consoler.js')

const devEnv = dotenv.config({ processEnv: {} })
dotenvExpand.expand(devEnv)

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    debug('Connection to MongoDB Established')
  })
  .catch((err) => {
    error(err)
  })

// const dirname = path.resolve()
const server = express()

const testingRoute = require('./routes/test.route.js')
const authRoutes = require('./routes/auth.route.js')
const userRoutes = require('./routes/user.route.js')
const threadRoutes = require('./routes/thread.route.js')
const frauditRoutes = require('./routes/fraudit.route.js')

const SERVER_PORT = process.env.DEV_SERVER_PORT
const FORM_HANDLER = multer()

const WHITELIST_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3333',
  'http://127.0.0.1:3333',
  'http://localhost',
  'http://127.0.0.1',
  '*'
]
const CORS_OPTIONS = {
  origin: WHITELIST_ORIGINS,
  method: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  withCredentials: true,
  optionSuccessStatus: 200
}

/*
 * MIDDLEWARES
 */
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cookieParser())

server.use(cors(CORS_OPTIONS))

server.use(FORM_HANDLER.array())

// server.use(express.static('public'))

/*
 * START SERVER
 */
server.listen(SERVER_PORT, () => {
  ready(`Server is running on port: ${SERVER_PORT}`)
})

/*
 * SERVER AND API ROUTES AND CONTROLLERS
 */
server.use('/api/v1', testingRoute)
server.use('/api/v1/auth', authRoutes)
server.use('/api/v1/user', userRoutes)
server.use('/api/v1/thread', threadRoutes)
server.use('/api/v1/fraudit', frauditRoutes)

// server.use(express.static(path.join(dirname, '/frontend/dist')))

// server.get('*', (req, res) => {
//   res.sendFile(path.join(dirname, '..', 'frontend', 'dist', 'index.html'))
// })

server.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})
