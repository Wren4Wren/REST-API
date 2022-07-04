const { Router } = require("express"); //Import Router method  ONLY from express
const { signUp } = require("./controllers"); //Import only signUp from controllers file
const userRouter = Router(); //Create a router that can have endpoints added to it

userRouter.post("/user", signUp); //Defining a post request on /user path, that calls the signUp controller

module.exports = userRouter;
