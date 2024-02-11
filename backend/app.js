require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const multer = require("multer");
const cookieParser = require("cookie-parser");

const { server, listener } = require("./server");
const testingRoute = require("./src/routes/testingRoute.js");
const subFraudsRoute = require("./src/routes/subFrauditRoute");

const SERVER_PORT = process.env.DEV_SERVER_PORT;
const FORM_HANDLER = multer();

console.log(SERVER_PORT);

server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
server.use(bodyParser.json());
server.use(upload.array());
server.use(cookieParser());
server.use(express.static("public"));

server.use(subFraudsRoute);
server.use(testingRoute);

listener(server, SERVER_PORT);
