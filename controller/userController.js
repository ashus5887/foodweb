const userModel = require("../model/userModel");

// updated as now we will use database for storing information

// what we need to implement greater than , less than, sort, limit, pagination
// applyied advanced filtering here

module.exports.addQueryParams=function(req,res,next){
    req.query.sort="averageratings";
    req.query.limit=5;
    next();
}

module.exports.getAllUser = async function (req, res) {
    var requiredQuery = { ...req.query };
    var excludedQueryOrEntities = ["sort", "page", "select", "limit"];

    for (var i = 0; i < excludedQueryOrEntities.length; i++) {
        delete requiredQuery[excludedQueryOrEntities[i]];
    }
    // console.log(requiredQuery);
    // console.log(req.query);
    var stringQuery = JSON.stringify(requiredQuery);
    stringQuery = stringQuery.replace(/lt|gt|gte|lte/g, function (match) {
        return `$${match}`;  // equivalent to "$"+match;
    });
    var query = JSON.parse(stringQuery);
  
    var pageOptions = {
        page:Number (req.query.page) || 0,
        limit:Number (req.query.limit) || 4,
        
    }
    
    var toskip=pageOptions.limit*pageOptions.page;
    var baseusers = userModel.find(query).skip(toskip).limit(pageOptions.limit);

    // sort

    if (req.query.sort) {
        // sorting if we use '-' it will sort in decending order.
        baseusers = baseusers.sort(`-${req.query.sort}`);
    }

    if (req.query.select) {
        const selectionCriteria = req.query.select.split("%").join(" ");
        // console.log(selectionCriteria);
        baseusers = baseusers.select(selectionCriteria);
    }
    // if (req.query.page) {
    // }
    // if (req.query.limit) {
    //     baseusers = baseusers
    // }
    // console.log(baseusers);

    var allusers = await baseusers;
    res.status(200).json({
        status: "successful get all users",
        data: allusers
    });
}

module.exports.getUser = async function (req, res) {
    // const user = JSON.parse(fs.readFileSync("./data/user.json"));
    // console.log(req.params);

    try {
        const singleuser = await userModel.findById(req.params.id);

        res.status(200).json({
            status: "successful got 1 user",
            data: singleuser
        });
    } catch (err) {
        res.status(200).json({
            status: "can't get user.",
            data: err
        });
    }
}

module.exports.checkInput = function (req, res, next) {
    if (req.body) {
        if (req.body.name) {
            next();
        } else {
            return res.status(400).json({
                status: "failed",
                data: "enter a name to create a user"
            })

        }
    } else {
        return res.status(400).json({
            status: "failed",
            data: "you should enter some details to create user"
        })
    }
}

module.exports.createUser = async function (req, res) {
    try {
        // console.log(req.body);
        const user = await userModel.create(req.body);
        res.status(200).json({
            status: "successful added new user",
            data: user
        });
    } catch (err) {
        res.status(200).json({
            status: "can't add new user",
            data: err
        });
    }
}

module.exports.updateUser = async function (req, res) {

    try {
        // console.log(req.body);
        const id = req.params.id || req.user["_id"];
        console.log(req.body, "req.body")
        req.user = await userModel.findByIdAndUpdate(id, req.body, {new:true})
        
        res.redirect("/me")
        res.status(200).json({
            status: "successfully updated user",
            data: req.user
        });
        // console.log(updateduser);
    } catch (err) {
        res.status(200).json({
            status: "can't update user",
            data: err
        });
    }
}

module.exports.deleteUser = async function(req, res) {

}

//For doing it with file system
// var fs = require("fs");
// const users = fs.readFileSync("./data/user.json")
// const jsonData = JSON.parse(users);

// module.exports.getAllUser = function (req, res) {
//     const myData = jsonData
//     // console.log(myData)
//     res.status(200).json({
//         myData
//     })
// }

// module.exports.getUser = function (req, res){
//     const data = "Request processed successfully " + req.myproperty;
//     var id = req.params;
//     id = id.id;
//     // console.log(id.id)
//     const myData = jsonData[id - 1]
//     // console.log(myData)
//     res.status(200).json({
//         myData
//     })
// }

// module.exports.checkInput = function(req, res, next){
//     if(res.body){
//         if(res.body.name){
//             next();
//         }else{
//             return res.status(200).json({
//                 status: "failed",
//                 response: "You should enter name to create a user"
//             });
//         }
//     }
//     else{
//         return res.status(400).json({
//             status: "failed",
//             response: "Ypu shoulf neter some details to create a user"
//         });
//     }
// }

// module.exports.createUser = function (req, res) {
//     const data = "Request processed successfully " + req.myproperty;
//     // console.log(req)
//     jsonData.push(req.body)
//     res.status(200).json({
//         status: "successfully added the body to user",
//         // data
//     })
//     fs.writeFileSync("./data/user.json", JSON.stringify(jsonData))
//     // console.log(jsonData[jsonData.length - 1])
// }

// module.exports.updateUser = function (req, res) {
//     console.log(req)
//     const {id} = req.params;
//     var key = Object.keys(req.body)[0];
//     jsonData[id - 1][key] = req.body[key];
    
//     res.status(200).json({
//         status: "successfully updated",
//         jsonData
//     })
    
//     fs.writeFileSync("./data/user.json", JSON.stringify(jsonData))  
//     // console.log(jsonData[jsonData.length - 1])
// }

// /*
// next()-> runs the next in line function
// */
