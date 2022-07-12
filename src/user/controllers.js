const User = require("./model");
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

// Log in

exports.login = async (req, res) => {
  try {
    if (!req.user) {
      // If the user is in the db
      throw new Error("User not found");
    } else {
      // Send the user object as a request
      res.send({ user: req.user });
    }
    // We be sensible devs
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//Read - find all the users

exports.listUsers = async (req, res) => {
  try {
    // Find the user object in the body
    const users = await User.find(req.body);
    if (!users) {
      throw new Error("User not located");
    } else {
      res.send({ users });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//Read - find one user {params}
exports.findUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      throw new Error("Invalid information");
    } else {
      res.send({ user });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// Update

exports.changePassword = async (req, res) => {
  try {
    const updatePass = await User.updateOne(
      { username: req.body.username },
      { $set: { password: req.body.password } }
    );
    res.send({
      updatePass,
      message: `Password update for ${req.body.username}`,
    });

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
    console.log("User has been deleted");
    res.send({ remove });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
