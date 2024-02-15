import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import cors from 'cors'
import express from 'express'
// import session from 'session'
import bodyParser from 'body-parser'
import multer from 'multer'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
// import path from 'path'
import { ready, error, debug } from './utils/consoler.js'

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

/*
 * MIDDLEWARES
 */
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cors)
server.use(FORM_HANDLER.array())
server.use(cookieParser())
server.use(express.static('public'))

/*
 * START SERVER
 */
server.listen(SERVER_PORT, () => {
  ready(`Server is running on port: ${SERVER_PORT}`)
})

/*
 * SERVER AND API ROUTES AND CONTROLLERS
 */
server.use('/api', testingRoute)
server.use('/api/auth', authRoutes)
server.use('/api/user', userRoutes)
server.use('/api/thread', threadRoutes)
server.use('/api/fraudit', frauditRoutes)

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
