const dotenv = require('dotenv');
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const multer = require("multer");
const cookieParser = require("cookie-parser");

dotenv.config()

const __dirname = path.resolve()
const server = express()

module.exports.listener = listener = (server, port) => {
  server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
};


const { server, listener } = require("./server");
const testingRoute = require("./src/routes/testingRoute.js");
const subFraudsRoute = require("./src/routes/subFrauditRoute");

const SERVER_PORT = process.env.DEV_SERVER_PORT;
const FORM_HANDLER = multer();

console.log(SERVER_PORT);

/* 
 * MIDDLEWARES
 */
server.use( bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(upload.array());
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


server.use(express.static(path.join(__dirname, '/frontend/dist')))

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})


server.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; 
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false, 
    statusCode, 
    message
  })
})


