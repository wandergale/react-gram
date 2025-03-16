const express = require("express");
const router = express();

// Routes
router.use("/api/users", require("./UserRoutes"));

router.get("/", (req, res) => {
  res.send("api working");
});

module.exports = router;
