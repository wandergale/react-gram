const express = require("express");
const router = express();

// Routes
router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotoRoutes"));

router.get("/", (req, res) => {
  res.send("api working");
});

module.exports = router;
