const express = require("express");
const router = express.Router();

router.get("/frauds", (req, res) => {
  res.status(200).json({
    msg: "All Current Frauds",
  });
});

router.get("/frauds/:id", (req, res) => {
  res.status(200).json({
    msg: `Route ${req.params.id}`,
  });
});

module.exports = router;
