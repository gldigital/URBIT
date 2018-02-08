const router = require("express").Router();
const outletRoutes = require("./outlets");

// Book routes
router.use("/outlets", outletRoutes);

module.exports = router;
