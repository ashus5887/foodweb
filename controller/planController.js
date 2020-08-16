var fs = require("fs");
const plans = fs.readFileSync("./data/plan.json")
const jsonDataPlan = JSON.parse(plans);//when file system is used
const planModel = require("../model/planModel");
//planModel is used when the database is mongoose, it provides functionality on the mongoDB system like find update etc

module.exports.addQueryParams = function (req, res, next) {
    console.log(req.query);
    req.query.sort = "averageratings";
    req.query.limit = "2";
    // req.query.price[$lte] = 100;
    next();
}

module.exports.getAllPlan = async function (req, res) {
   /*
    Basic case when no filtering is given like gt, lt etc, then this can be used
    const query = await planModel.find();
    res.status(200).json({
        sucess: "All the plans are as follows",
        data:query
    })
    */

   //This is done for filtering
        let stringQuery = JSON.stringify(req.query);
        stringQuery = stringQuery.replace(/gt|lt|gte|lte/g, function(match){
            return "$" + match;
        })
          //query received as {"duration":{"gt":"10"}}, thus we convert it
          //query to be passed in the find function has to be of the converted form
          // console.log(stringQuery)
        const originalQuery = {...req.query}//triple dot gives deep copy otherwise reference is copied  
        let dollarQuery = JSON.parse(stringQuery)
        var toBeExcluded = ["sort", "limit", "page", "select"];
        for(var i = 0;  i < toBeExcluded.length; i++)
        {
            delete dollarQuery[toBeExcluded[i]]
        }
        //in mongoDB promise is somewhat called a query
        //so then and await can be used on a query
        let filteredPlans = planModel.find(dollarQuery); // gives a pending query
        if(req.query.sort)
        {
            var sortString = "-" + (req.query.sort);//make descending
            filteredPlans = filteredPlans.sort(sortString);
        }
        if(req.query.select)
        {
            var selectionCriteria = req.query.select.split("%").join(" ")
            filteredPlans = filteredPlans.select(selectionCriteria)
        }

            var pages = Number(req.query.page)||1;
            // console.log(pages)
            var limits = 5;
            if(req.query.limit)
            {
                limits = Number(req.query.limit);
            }
            var toBeSkipped = (pages - 1) * limits;
            filteredPlans = filteredPlans.skip(toBeSkipped);
            filteredPlans = filteredPlans.limit(limits);
        
        var finalFilteredPlans = await filteredPlans;
        res.status(200).json({
            sucess: "Filtered plans are as follows",
            data:finalFilteredPlans
        })
   //

}

module.exports.getPlan = async function(req, res){
    /*
    This is if you want to write the plan to the file
    var id = req.params;
    id = id.id;
    const myData = jsonDataPlan[id - 1]
    res.status(200).json({
        myData
    })
    */
    var id = req.params;
    id = id.id;
    const plan = await planModel.findById(id);
    res.status(200).json({
        sucess: "required plan is",
        data:plan
    })
}

module.exports.createPlan = async function (req, res) {
    /*
    This is if you want to write the plan to the file
    // jsonDataPlan.push(req.body)
    // res.status(200).json({
    //     status: "successfully added the body to user",
    // })
    // fs.writeFileSync("./data/plan.json", JSON.stringify(jsonDataPlan))

    otherwise to add the new plan to the mongoDB follow the code below
    */
    try{
        const plan = await planModel.create(req.body);
        res.status(200).json({
            sucess: "plan added successfully",
            data:plan
        })
    }
    catch(err){
        res.status(200).json({
            failure: "plan not added",
        })
    }
}

module.exports.updatePlan = async function (req, res) {
    /*
    const {id} = req.params;    
    var key = Object.keys(req.body)[0];
    jsonDataPlan[id - 1][key] = req.body[key];
    
    res.status(200).json({
        status: "successfully updated",
        jsonDataPlan
    })
    
    fs.writeFileSync("./data/plan.json", JSON.stringify(jsonDataPlan))  
    // console.log(jsonData[jsonData.length - 1])
    */
   
   var id = req.params;
   id = id.id;
   const plan = await planModel.findByIdAndUpdate(id, req.body, {new:true});//new is written otherwise old plan is returned
//    console.log(plan)
   res.status(200).json({
    sucess: "Updated to",
    data:plan
})
}
