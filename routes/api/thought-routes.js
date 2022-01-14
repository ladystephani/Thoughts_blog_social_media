const router = require("express").Router();
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
} = require("../../controllers/thought-controllers");

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:id")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:userId/:thoughtId").put(createReaction);

router.route("/:userId/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
