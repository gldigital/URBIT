const router = require("express").Router();
const outletsController = require("../../controllers/outletsController");
const db = require("../../models");

// Matches with "/api/outlets"
router.route("/")
  .get(outletsController.findAll)
  .post(outletsController.create);
  
// Matches with "/api/outlets/getoutlets"
router.route("/getoutlets")
  .get(outletsController.findOutlets)
  
// Matches with "/api/outlets/:id"
router
  .route("/:id")
  .get(outletsController.findById)
  .put(outletsController.update)
  .delete(outletsController.remove);

module.exports = router;