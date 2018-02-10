const router = require("express").Router();
const topicsController = require("../../controllers/topicsController");
const request = require('request');

// Matches with "/api/books"
router.route("/")
  .get(topicsController.findAll)
  .post(topicsController.create);

// Matches with "/api/topics/gettopics"
router.route("/gettopics")
  .get(topicsController.findNewsTopics)

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(topicsController.findById)
  .put(topicsController.update)
  .delete(topicsController.remove);

module.exports = router;