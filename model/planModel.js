const mongoose = require("mongoose");

// const DB = 
//     "mongodb+srv://ashus5887:ashusona1@cluster0-azjxq.gcp.mongodb.net/test?retryWrites=true&w=majority"
    //this link is given when we form the cluster on mongoDB site    

    const DB = 
    "mongodb+srv://ashus5887:ashusona1@cluster0-azjxq.gcp.mongodb.net/test?retryWrites=true&w=majority"
    try{
        mongoose
        .connect(DB, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true}) // second argument passed so that there are no deprecation warnings
        .then(function(conn){
            // console.log(conn.connection);
            console.log("planDB is connected")
        });
    }
    catch(err)
    {
        console.log(err)
    }
        

    const planSchema = new mongoose.Schema({
        name: {type: String, required: [true, "name is a required field"]},
        price: {type: Number, min: 20, default: 40},
        description: {type:String, required: true},
        averageratings: {type: Number, default: 5},
        duration: {type : Number} 
    })
    //if these constraints are violated then there will be an error

    const planModel = mongoose.model("planModel", planSchema);
    module.exports = planModel;