require("dotenv").config();

const bodyParser = require("body-parser");
const { server, listener } = require("./server");
const testingRoute = require("./src/routes/testingRoute.js");
const subFraudsRoute = require("./src/routes/subFrauditRoute");

const SERVER_PORT = process.env.DEV_SERVER_PORT;
console.log(SERVER_PORT);

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
server.use(subFraudsRoute);
server.use(testingRoute);

listener(server, SERVER_PORT);
