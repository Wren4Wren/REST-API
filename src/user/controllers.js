const User = require("./model");

exports.signUp = async (req, res) => {
  //REQUEST FIRST, RESPONSE SECOND!!!
  try {
    // req.body //post info to server
    const newUser = await User.create(req.body); //requ.body contains key value(k/v) pairs that match my user model
    res.send({ user: newUser });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
