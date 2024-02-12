const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose')
const path = require('path')

var devEnv = dotenv.config({processEnv: {}})
dotenvExpand.expand(devEnv)

mongoose.connect(process.env.MONGOOSE_URL).then(() => {
  console.log('Connected To MongoDB')
}).catch((err) => {
  console.log(err);
})

const dirname = path.resolve()
const server = express()

const testingRoute = require("./src/routes/test.route.js");
const subFraudsRoute = require("./src/routes/fraudit.route.js");
const authRoutes = require('./src/routes/auth.route');
const userRoutes = require('./src/routes/user.route.js')
const threadRoutes = require('./src/routes/thread.route.js')

const SERVER_PORT = process.env.DEV_SERVER_PORT;
const FORM_HANDLER = multer();

/* 
 * MIDDLEWARES
 */
server.use( bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(FORM_HANDLER.array());
server.use(cookieParser());
server.use(express.static("public"));

/*
 * START SERVER
 */
server.listen(process.env.DEV_SERVER_PORT, () => {
  console.log(`Server is running on port: ${process.env.DEV_SERVER_PORT}`)
})

/*
 * SERVER AND API ROUTES AND CONTROLLERS
 */
server.use(subFraudsRoute);
server.use(testingRoute);
server.use('/api/auth', authRoutes);
server.use('/api/user', userRoutes);
server.use('/api/thread', threadRoutes);



// server.use(express.static(path.join(dirname, '/frontend/dist')))

// server.get('*', (req, res) => {
//   res.sendFile(path.join(dirname, '..', 'frontend', 'dist', 'index.html'))
// })


server.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; 
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false, 
    statusCode, 
    message
  })
})


