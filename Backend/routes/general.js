const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello to world of taskPlanet....!");
});

module.exports = router;

