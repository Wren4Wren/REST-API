const User = require("./model");
const bcrypt = require("bcryptjs");
// Create

exports.signUp = async (req, res) => {
  //REQUEST FIRST, RESPONSE SECOND!!!
  try {
    // req.body //post info to server
    const newUser = await User.create(req.body); //req.body contains key value(k/v) pairs that match my user model
    res.send({ user: newUser });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// Read

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      throw new Error("Incorrect credentials");
    } else {
      res.send({ user });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// Update

exports.update = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// Delete

exports.delete = async (req, res) => {
  try {
    const remove = await User.findOneAndDelete({
      username: req.params.username,
    });
    console.log(`${req.body.username} has been deleted`);
    res.e;
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
