const signUp = document.querySelector(".signUp");

async function mysignup(name, email, password, confirmpassword, role){
    const result = await axios.post("/api/user/signup",{name, email, password, confirmpassword, role});
    if(result.data.success)
    {
        alert("User created");
    }
    else
    {
        alert("User not created")
    }
}
if(signUp)
{
    signUp.addEventListener("submit", function(event){
        console.log("in listener")
        event.preventDefault();//Stops reload of the login page on click
        const inputs = document.getElementsByTagName("input");
        var name = inputs[0].value;
        var email = inputs[1].value;
        var password = inputs[2].value;
        var confirmpassword = inputs[3].value;
        var role = "user";
        mysignup(name, email, password, confirmpassword, role);
    })
}