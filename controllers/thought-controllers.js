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
};

module.exports = thoughtController;
