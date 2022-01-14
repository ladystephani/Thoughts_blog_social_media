const { User, Thought } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getOneThought({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createThought({ body }, res) {
    Thought.create(body)
      .then((dbData) => res.json(dbData))
      .catch((err) => res.status(400).json(err));
  },
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, //take from route /:thoughtid
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.status(400).json(err));
  },
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbData) => res.json(dbData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
