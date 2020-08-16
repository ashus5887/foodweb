const express = require("express");
const userRouter = express.Router();

const {addQueryParams, getAllUser, getUser, checkInput, createUser, updateUser, deleteUser} = require("../controller/userController")
const {signup, login, protectRoute, isAuthorised, updatePassword, forgetPassword, resetPassword, logout} = require("../controller/authController");


userRouter
    .route("/signup")
    .post(signup)
userRouter
    .route("/login")
    .post(login)

userRouter
    .route("")
    .get(protectRoute, isAuthorised(["admin"]), getAllUser)
    .post(checkInput, createUser)
userRouter
    .route("/best-5-users")
    .get(protectRoute, getAllUser)
userRouter
    .route("/updatepassword")
    .post(protectRoute, updatePassword)
userRouter
    .route("/forgetpassword")
    .patch(forgetPassword)    
userRouter
    .route("/resetpassword/:token")
    .patch(resetPassword)    
userRouter
    .route("/logout")
    .patch(protectRoute,logout)
userRouter  
    .route("/updateuser")
    .post(protectRoute, updateUser)    
userRouter
    .route("/:id")
    .get(getUser)
    .patch(isAuthorised(["admin"]), updateUser)
    .delete(isAuthorised(["admin"]), deleteUser)

module.exports = userRouter;