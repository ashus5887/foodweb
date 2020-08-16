const planModel = require("../model/planModel");
const userModel = require("../model/userModel")

module.exports.getHomePage = async function (req, res, next) {
  let plans = await planModel.find();
  const user = req.user
  plans = plans.slice(0, 3);
  res.status(200).render("home.pug", {
    plans: plans,
    pageName: "Home Page",
    user
  });
};
module.exports.getPlanPage = async function (req, res) {
  // get All plans'
  const user = req.user
  let plans = await planModel.find();
  plans = plans;
  res.status(200).render("planPage.pug", {
    plans: plans, user
  });
};
module.exports.getLoginPage = async function (req, res) {
  const user = req.user
  res.status(200).render("loginPage.pug", { user });
};
module.exports.getSignUpPage = async function (req, res) {
  res.status(200).render("signUpPage.pug");
};
module.exports.getProfilePage = async function (req, res) {
  const user = req.user;
  res.status(200).render("me.pug", { user });
}
module.exports.getUpdatePage = async function (req, res) {
  const user = req.user
  res.status(200).render("updateDetails.pug", { user });
}
module.exports.getForgetPasswordPage = async function (req, res) {
  res.status(200).render("forgetPasswordPage.pug");
}
module.exports.getUpdatePasswordPage = async function (req, res) {
  const user = req.user
  res.status(200).render("updatePasswordPage.pug", { user });
}
module.exports.getResetPage = async function (req, res) {
  res.status(200).render("resetPasswordPage.pug");
}
