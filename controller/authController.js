const secretkey = "lkjldskjflaskfdndfsdjfhkasdfjbfmasndbjsdfmsnvZJcvajfn";
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken")
const emailer = require("../utility/email");
const { CommandCursor } = require("mongodb");
const e = require("express");

module.exports.signup = async function (req, res) {
    try {
        console.log("in signup")
        const user = await userModel.create(req.body);
        const id = user["_id"];
        const token = await jwt.sign({ id }, secretkey);
        
        res.cookie("jwt", token, {httpOnly: true, secure: true});
        res.status(201).json({
            success: "user created",
            user,
            token
        })

    }
    catch (err) {
        console.log(err);
        res.status(201).json({
            data: "Something went wrong"
        })
    }
}

module.exports.login = async function (req, res, next) {
    // console.log(req.header);
    try {

        if (req.body.email === undefined || req.body.password === undefined) {
            return res.status(201).json({
                failure: "Id or Password is empty",
            })
        } else {
            const user = await userModel.findOne({ "email": req.body.email });
            // console.log(user +"--------- "+ req.body.password);
            // const id=user["_id"];
            // const token=await jwt.sign({id},secretkey);
            if (user) {
                if (user.password == req.body.password) {
                    const id = user["_id"];
                    const token = await jwt.sign({id} , secretkey);//we will send this token to the client for security
                    console.log(token, "token")
                    //jwt.sign adds headers, authorization to the req body
                    res.cookie("jwt", token, {httpOnly: true});
                    // console.log(res.cookie, "cookie")
                    return res.status(201).json({
                        success: "user login",
                        // user,
                        token
                    })
                } else {
                    return res.status(201).json({
                        data: "password is incorrect",
                    })
                }
            }
            else {
                return res.status(201).json({
                    data: "username is incorrect",
                })
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            failure: "email is incorrect",
            data: err
        });
    }
}

module.exports.protectRoute = async function (req, res, next) {
    //protect route is essentially written to make sure that the user is already logged in through the requisite route and is not just copying the link to get to that page
    // console.log(req.headers)
    console.log(req.cookies, "req.cookies")
    const token = req.cookies?req.cookies.jwt:null || req.headers.authorization? req.headers.authorization.split(" ")[1]:null;
    console.log(token, "token1");
    if (token) {
        console.log(token, "token2")
        const isVerified = await jwt.verify(token, secretkey)
        if (isVerified) {
            const user = await userModel.findOne({_id:isVerified.id});
            // console.log(user.role)
            req.user = user
            req.role = user.role;
            next();
        } else {
            return res.status(401).json({
                status: "User not verified"
            })
        }
    }
    else {
        return res.status(401).json({
            status: "User not logged in"
        })
    }

    // catch (err) {
    //     return res.status(401).json({
    //         failure : "something went wrong",
    //         data: err
    //       });
    // }
}

module.exports.updatePassword = async function (req, res) {
    // console.log(req, "req")
    const user = req.user;
    console.log(req.body)
    if (req.body.password && req.body.newpassword && req.body.confirmpassword) {
        if (user.password == req.body.password) {
            user.password = req.body.newpassword;
            user.confirmpassword = req.body.confirmpassword;
            await user.save();//This calls the validator and updates the database also
            res.json({
                data: "Password changed Succesfully"
            })
        }
        else {
            return res.json({
                data: "Old Password do not match"
            })
        }
    }
    else {
        return res.json({
            data: "Please add all entries"
        })
    }
}

module.exports.isAuthorised = function (roles) {
    return function (req, res, next) {
        console.log(req.role)
        if (roles.includes(req.role)) {
            next();
        }
        else {
            return res.status(401).json({
                status: "User not verified auth"
            })
        }
    };
}

module.exports.forgetPassword = async function (req, res) {
    try {
        // console.log("inside forgetPassword");
        const user = await userModel.findOne({ email: req.body.email });
        console.log(user, "inside forget password");
        if (user) {
            console.log("inside if user")
            const token = user.generateToken();
            console.log(token);

            await user.save(
                { validateBeforeSave: false }
            )
            console.log("hi")
            const options = {
                to: user.email,
                subject: "Password Reset",
                text: `localhost:3000/api/user/resetpassword/${token}`,
                html: `<h1>Reset Token</h1><a href="/resetpassword"> ${token} </a>`
            }
            console.log(await emailer(options), "console")

            res.status(201).json({
                success: "Reset email have been sent to your email"
            })
        }
        else {
            res.status(201).json({
                data: "User with this email does not exist"
            })
        }

    } catch (err) {
        // console.log(err);

        res.json({
            data: err
        })
    }
}

module.exports.resetPassword = async function (req, res) {
    // console.log(req.params.token);
    //We have emailed the token and we want to verify if the token that the user will send throught the mail
    // for eg localhost:3000/api/user/resetpassword/306227ac4f3a8d90192398776e1cad5bed4a59c7171f66def70c07b5ad30903a
    // 306227... is the token that we have sent through email, now we are receiving it from the user/
    var user = await userModel.findOne(req.params);//finding if this token exist in the database
    try {
        if (user) {
            if (req.body.newpassword && req.body.confirmpassword) {//if the user have sent the password and confirmpassword
                user.password = req.body.newpassword//setting new password
                user.confirmpassword = req.body.confirmpassword;
                user.token = undefined;//so that repetedly the password cannot be set using the same token
                await user.save();//calling the save ,, updating the user in the mongoDb user database
                return res.json({
                    success: "Password changed Succesfully"
                })
            }
            else {
                return res.json({
                    data: "Please add all entries"
                })
            }
        }
        else {
            return res.json({
                data: "token incorrect"
            })
        }
    }
    catch (err) {
        res.json({
            data: err
        })
    }
}

module.exports.logout = function (req, res, next) {
    console.log("inside logout")
    res.cookie("jwt", "randomtext23", {httpOnly: true, expires : new Date(Date.now())})
    res.redirect("/");
}

module.exports.isLoggedIn = async function (req, res, next){

    const token = req.cookies?req.cookies.jwt:null || req.headers.authorization? req.headers.authorization.split(" ")[1]:null;
    
    if (token) {
        const isVerified = await jwt.verify(token, secretkey)
        if (isVerified) {
            const user = await userModel.findOne({_id:isVerified.id});
            // console.log(user.role)
            req.user = user
            req.role = user.role;
            next();
        } else {
            next();
        }
    }
    else {
        next();
    }
}
