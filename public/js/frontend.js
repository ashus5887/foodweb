var stripe = Stripe('pk_test_tnbMjQ8ZPaZV1HVmzFFzTZeG00HTYFxgcT');
const login = document.querySelector(".login");
const forgetPassword = document.querySelector(".forgetPassword")
const resetButton = document.querySelector(".resetPassword")
const signUpButtons = document.querySelectorAll(".signup-button");

async function mylogin(email, password) {
    const result = await axios.post("/api/user/login", { email, password });
    if (result.data.success) {
        alert("User Logged in");
        location.assign("/me");//to send the user to the home page
    }
    else {
        alert("Wrong Email or Password")
    }
}
async function myReset(email, token, newpassword, confirmpassword) {
    const result = await axios.patch(`/api/user/resetpassword/${token}`, { email, token, newpassword, confirmpassword });
    if (result.data.success) {
        alert("Password Changed Succesfully");
        location.assign("/login");//to send the user to the login page
    }
    else {
        alert("Something went wrong in myReset")
    }
}
async function myForget(email) {
    const result = await axios.patch("/api/user/forgetpassword", { email });
    if (result.data.success) {
        alert("Reset Email have been sent");
        location.assign("/reset");//to send the user to the reset page
    }
    else {
        alert("Something went wrong in myForget")
    }
}
async function booking(id)
{
    console.log("inside booking")
    var id = {id};
    const result = await axios.post("/api/booking/checkout", id);
    console.log(result.data.success, "result in booking")
    
    if(result.data.success){
        await stripe.redirectToCheckout({
            sessionId: result.data.session.id
        });
        alert("Payment has been done")    
    }
    else{
        console.log("Payment failed inside booking")
    }
}

if (login) {
    login.addEventListener("submit", function (event) {
        event.preventDefault();//Stops reload of the login page on click
        const inputs = document.getElementsByTagName("input");
        var email = inputs[0].value;
        var password = inputs[1].value;
        mylogin(email, password);
    })
}
if (forgetPassword) {
    console.log(forgetPassword, "Forget Button");
    forgetPassword.addEventListener("submit", function (event) {
        event.preventDefault();//Stops reload of the login page on click
        const inputs = document.getElementsByTagName("input");
        var email = inputs[0].value;
        myForget(email);
    })
}
if (resetButton) {
    resetButton.addEventListener("submit", function (event) {
        event.preventDefault();//Stops reload of the login page on click
        const inputs = document.getElementsByTagName("input");
        var email = inputs[0].value;
        var token = inputs[1].value;
        var newpassword = inputs[2].value;
        var confirmpassword = inputs[3].value;
        myReset(email, token, newpassword, confirmpassword);
    })

}
// console.log(signUpButtons, "signup buttons");
if(signUpButtons){
    // console.log(signUpButtons, "signup buttons");
    for(var i = 0; i < signUpButtons.length; i++)
    {
        signUpButtons[i].addEventListener("click", function(event){
            var id = (event.target.getAttribute("plan-id"));
            console.log("inside signup")
            booking(id);
        })
    }
}