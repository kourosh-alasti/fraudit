require("dotenv").config();

const express = require("express");

module.exports.server = express();
module.exports.listener = listener = (server, port) => {
  server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
};
