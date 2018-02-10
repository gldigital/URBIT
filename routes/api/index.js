const router = require("express").Router();
const outletRoutes = require("./outlets");
const topicRoutes = require("./topics");

//  routes
router.use("/outlets", outletRoutes);
router.use("/topics", topicRoutes);

module.exports = router;
