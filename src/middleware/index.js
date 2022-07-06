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
    const verifyPass = await User.findOne({ username: req.body.username });
    console.log(verifyPass);
    const checkPass = await bcrypt.compare(
      req.body.password,
      verifyPass.password
    );
    if (checkPass) {
      console.log("Login successful");
      next();
    } else {
      throw new Error("Incorrect deets");
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.check = async (req, res, next) => {
  try {
    const checkUsers = await User.findOne({ username: req.body.username });
    console.log(checkUsers);
    const checkPass = await bcrypt.compare(
      req.body.password,
      checkUsers.password
    );
    if (checkPass) {
      next();
    } else {
      throw new Error("Password incorrect");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
