const bcrypt = require("bcryptjs");
const User = require("../user/model");
const jwt = require("jsonwebtoken");

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

exports.checkPass = async (req, res, next) => {
  try {
    req.user = await User.findOne({ username: req.body.username }); // Searches for username or email in database

    if (await bcrypt.compare(req.body.password, req.user.password)) {
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

exports.tokenCheck = async (req, res, next) => {
  try {
    //decode token using same secret that created the token
    const decodedToken = jwt.verify(
      req.header("Authorization"),
      process.env.SECRET
    );
    req.user = await User.findById(decodedToken.id); //finding the user by their id, stored in the token
    next();
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
