const UserModel = require("../app.models/user.models");

const authUser = (req,res,next) => {
    let token = req.header("token");
    let userID = req.header("userID");

    console.log("userID : ", userID);
    console.log("token : ",token);

    UserModel.authUser([userID,token],(result,error)=>{
        if(!error){
            console.log(result);
            if(result[0].NumbRow>0){
                next();
            }else{
                res.status(401).json({error: "Unauthorized"});
            }
        }
    });
}

const testAuth = (req,res,next) => {
    let userID = req.body.userID,
    token = req.body.token;

    if(userID === 1, token=== "a"){
        next();
    }else{
        res.status(401).json({error: "Unautorized"});
    }
}

module.exports = { authUser,testAuth }