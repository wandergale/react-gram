const express = require("express");

const router = express();

router.get("/", (req, res) => {
  res.send("api working");
});

module.exports = router;
