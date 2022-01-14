const User = require("../models/User");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser({ body }, res) {
    // example data
    // {
    //     "username": "lady",
    //     "email": "lady@gmail.com"
    //   }
    User.create(body)
      .then((dbData) => res.json(dbData))
      .catch((err) => res.status(400).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
