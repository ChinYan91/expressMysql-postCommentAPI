const UserModel = require("../app.models/user.models");
const crypto = require("crypto");

class UserController{
    register(req,res){
        let firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email,
        password = req.body.password,
        hash = crypto.createHash('sha256').update(password).digest('base64');

        let params = [firstName, lastName, email, hash];
        let response = UserModel.register(params);

        res.status(200).json({response: response});
    }

    login(req,res){
        let email = req.body.email,
        password = req.body.password,
        hash = crypto.createHash('sha256').update(password).digest('base64');

        let params = [email, hash];
        
        UserModel.login(params, (result,error)=>{
            if(!error){
                console.log("result => ",result)
                let timeStamp = new Date();
                let string = result[0].id+" "+timeStamp;
                let userID = result[0].id;
                let token = crypto.createHash('sha256').update(string).digest('base64');
                UserModel.updateToken([token, userID], (result,error)=>{
                    if(!error){
                        console.log(result);
                        res.status(200).json({data:{ userID, token } });
                    }
                });
                
            }
        });
    }

    renewToken(req,res){
        let userID = req.body.userID;
        let string = userID+" "+Date.now;
        let token = crypto.createHash('sha256').update(string).digest('base64');
        UserModel.updateToken([token, userID], (result,error)=>{
            if(!error){
                console.log(result);
                res.status(200).json({data:{ userID, token } });
            }
        });
    }
}

module.exports = new UserController();