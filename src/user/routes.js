const { Router } = require("express"); //Import Router method  ONLY from express
const { signUp, login } = require("./controllers"); //Import only signUp from controllers file
const userRouter = Router(); //Create a router that can have endpoints added to it
const { hashPass } = require("../middleware");
userRouter.post("/user", hashPass, signUp); //Defining a post request on /user path, that calls the signUp controller
userRouter.post("/login", login); //unHashPass, //Defining a post request on/login path that calls the login controller

module.exports = userRouter;
