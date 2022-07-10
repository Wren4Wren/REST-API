const User = require("./model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Create

exports.signUp = async (req, res) => {
  //REQUEST FIRST, RESPONSE SECOND!!!
  try {
    // req.body //post info to server
    const newUser = await User.create(req.body); //req.body contains key value(k/v) pairs that match my user model
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
    res.send({ user: newUser, token });
  } catch (error) {
    console.log("Error at signup", error);
    res.send({ error });
  }
};

// Read

exports.login = async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    if (!user) {
      // If the user is in the db
      throw new Error("User not found");
    } else {
      res.send({ user });
    }
    // We be sensible devs
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//Also read

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// Update

exports.changePassword = async (req, res) => {
  try {
    // Check if the middleware has auth'd the request
    if (!req.user) {
      throw new Error("Invalid credentials");
    } else {
      // search database for record matching req.body, store it to variable
      // Then set the password hashed by the middleware
      const user = await User.updateOne(
        { username: req.body.username },
        { password: req.user.newPass }
      );
      res.send({ user });
    }
    // send the result of the update command
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// Delete

exports.deleteUser = async (req, res) => {
  try {
    const remove = await User.findOneAndDelete({
      username: req.params.username,
    });
    console.log(`${req.body.username} has been deleted`);
    res.send({ remove });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
