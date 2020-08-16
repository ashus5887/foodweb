const mongoose = require("mongoose");
var crypto = require("crypto");
var validator = require("validator")

const DB = "mongodb+srv://ashus5887:ashusona1@cluster0-azjxq.gcp.mongodb.net/test?retryWrites=true&w=majority";

try{
    mongoose
        .connect(DB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
        .then(function (conn) {
            // console.log(conn.connection);
            console.log("user db is connected");
        });
}
catch(err)
{
    console.log(err);
}
const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is a required field"] },
    email: { type: String, required: [true, "E-mail is a required field"] },
    password: { type: String, required: [true, "Password is a required field"] },
    role: {
        type: String,
        enum: ["admin", "restaurantOwner", "user", "deliveryBoy"],
        default: "user"
    },
    confirmpassword: {
        type: String, required: [true, "Confirm Password is a required field"],
        validate: {
            validator: function () {
                return this.password === this.confirmpassword; //=== checks for the datatype as well
            },
            message: " Password and confirm password must be same"
        }
    },
    token: String
});
userSchema.pre("save", function () {
    this.confirmpassword = undefined;
})

userSchema.method("generateToken", function () {
    console.log("inside generate token  ")
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token, "token")
    this.token = token;
    console.log("returning token")
    return token;
})
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;