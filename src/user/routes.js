const { Router } = require("express"); //Import Router method  ONLY from express
const { signUp, login, deleteUser, changePassword } = require("./controllers"); //Import only signUp from controllers file
const userRouter = Router(); //Create a router that can have endpoints added to it
const { hashPass, tokenCheck, checkPass } = require("../middleware");
userRouter.post("/user", hashPass, signUp); //Defining a post request on /user path, that calls the signUp controller
userRouter.post("/login", checkPass, login); //unHashPass, //Defining a post request on/login path that calls the login controller
userRouter.get("/token", tokenCheck, login);
userRouter.delete("/delete", deleteUser);
userRouter.put("/password", hashPass, changePassword);
userRouter.get("/users", listUsers);

module.exports = userRouter;
