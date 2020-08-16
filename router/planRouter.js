const express = require("express");
const planRouter = express.Router();

const {addQueryParams, getAllPlan, getPlan, createPlan, updatePlan} = require("../controller/planController")
const {signup, login, protectRoute, isAuthorised} = require("../controller/authController");

planRouter
    .route("")
    .get(protectRoute, isAuthorised(["admin"]), getAllPlan)
    .post(protectRoute, isAuthorised(["admin", "restaurantOwner"]),createPlan);
planRouter
    .route("/best-2-plans")
    .get(addQueryParams, getAllPlan)    
planRouter  
    .route("/:id")
    .get(getPlan)
    .patch(updatePlan);
module.exports = planRouter;