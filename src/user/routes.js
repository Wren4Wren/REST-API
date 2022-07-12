const { Router } = require("express"); //Import Router method  ONLY from express

const {
  signUp,
  login,
  listUsers,
  findUser,
  changePassword,
  deleteUser,
} = require("./controllers"); //Import only signUp from controllers file

const { hashPass, tokenCheck, checkPass } = require("../middleware");

const userRouter = Router(); //Create a router that can have endpoints added to it

userRouter.post("/user", hashPass, signUp); //Defining a post request on /user path, that calls the signUp controller

userRouter.post("/login", checkPass, login); //unHashPass, //Defining a post request on/login path that calls the login controller

userRouter.get("/token", tokenCheck, login);

userRouter.get("/user", listUsers); // Lists users on /user path

userRouter.get("/findUser/:username", findUser); //Finds a user by defining  a get request on the /findUser path

userRouter.put("/password", hashPass, changePassword);

userRouter.delete("/user/:username", deleteUser);

module.exports = userRouter;
