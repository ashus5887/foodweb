const express = require("express")
const {getHomePage, getPlanPage, getLoginPage, getSignUpPage, getProfilePage, getUpdatePage, getForgetPasswordPage, getUpdatePasswordPage, getResetPage} = require("../controller/viewController")
const {protectRoute, logout, isLoggedIn} = require("../controller/authController")

var viewRouter = express.Router();

viewRouter
    .use(isLoggedIn) // request for the view is first sent ot the isLoggedIn

viewRouter
    .route("")
    .get(getHomePage)   

viewRouter
    .route("/plans")
    .get(getPlanPage)

viewRouter  
    .route("/login")
    .get(getLoginPage)  

viewRouter
    .route("/logout")
    .get(protectRoute, logout)    

viewRouter  
    .route("/signup")
    .get(getSignUpPage) 

viewRouter  
    .route("/reset")
    .get(getResetPage)     
    
viewRouter
    .route("/me")
    .get(protectRoute, getProfilePage)    

viewRouter
    .route("/updateuser")
    .get(protectRoute, getUpdatePage)

viewRouter
    .route("/updatepassword")
    .get(protectRoute, getUpdatePasswordPage)

viewRouter
    .route("/forgetpassword")
    .get(getForgetPasswordPage)
    
module.exports = viewRouter;
    