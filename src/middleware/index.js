const bcrypt = require("bcryptjs");
const User = require("../user/model");

exports.hashPass = async (req, res, next) => {
  try {
    // const tempPass = req.body.password; //Grabbed password variable from body and stored it locally
    // const hashedPass = await bcrypt.hash(tempPass, 8); //hashed the password and stored it in a new const
    // req.body.password = hashedPass; //Stores freshly hashed password back in the req body
    req.body.password = await bcrypt.hash(req.body.password, 8); //All steps above, condensed into 1 line
    next(); //Moves onto the next middleware/controller in endpoint
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.unHashPass = async (req, res, next) => {
  try {
    req.user = await User.find({ username: req.body.username });
    const dataFeed = await bcrypt.compare(req.body.password, req.user.password);
    next();
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
