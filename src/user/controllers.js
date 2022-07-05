const User = require("./model");

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

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      email: req.body.email,
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

exports.updateDetails = async (res) => {
  try {
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
