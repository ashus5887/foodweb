const planModel = require("../model/planModel");
const stripe = require("stripe")("sk_test_XPBXLR9uYkt126juUygoeJxa00L03GE4zX")

module.exports.checkout = async function (req, res) {
    try {
        console.log("inside checkout")
        const id = req.body.id;
        const plan = await planModel.findById(id);
        console.log(plan, "plan checkout")
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                name: plan.name,
                description: 'Comfortable cotton t-shirt',
                amount: plan.price * 100,
                currency: 'inr',
                quantity: 1,
            }],
            success_url: 'http://localhost:3000',
            cancel_url: 'http://localhost:3000',

        });

        res.status(201).json({
            data: plan,
            success: "Payment object sent",
            session
        })
    }
    catch (err) {

        res.status(201).json({
            failure: err
        })
    }
};
