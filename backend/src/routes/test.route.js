const express = require("express");
const Logger = require("../utils/logger");
const { testLogger, test } = require("../controllers/test.controller");

const router = express.Router();
const logger = new Logger("app");

router.get('/test', test)
router.post("/test", testLogger);

module.exports = router;
