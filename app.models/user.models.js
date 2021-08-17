const {Sequelize, json, STRING} = require("sequelize");
const sequelize = require("../utilities/sequelize");

class UserModel{
    constructor(){
        this.Model = sequelize.define("user", {
            firstName : { type: Sequelize.STRING },
            lastName : { type: Sequelize.STRING },
            email : { type: Sequelize.STRING  },
            password : { type: Sequelize.STRING  },
            token : { type: Sequelize.STRING  }

        },{ 
            tableName : "user"
        });
        this.Model.sync();
    }

    register(params){
        let sql = "INSERT INTO user(`firstName`,`lastName`,`email`,`password`,`token`,`createdAt`,`updatedAt`) VALUES(?,?,?,?,null, NOW(), NOW());";
        sequelize.query(sql,{
            replacements: params,
            type : sequelize.QueryTypes.INSERT
        }).then((result,error)=>{
            return [result,error]
        });
    }

    updateToken(params,callback){
        let sql = "UPDATE user SET `token` = ? where id = ?";
        sequelize.query(sql, {
            replacements: params,
            type: sequelize.QueryTypes.UPDATE
        }).then((result,error)=>{ callback(result,error); });
    }

    login(params,callback){
        let sql = "SELECT `id` FROM user WHERE `email` = ? AND `password` = ?";
        sequelize.query(sql, {
            replacements: params,
            type: sequelize.QueryTypes.SELECT
        }).then((result,error)=>{ 
            callback(result,error);
        });
    }

    authUser(params,callback){
        let sql = "SELECT COUNT(`id`) AS NumbRow FROM user WHERE `id` = ? AND `token` = ?";
        sequelize.query(sql, {
            replacements: params,
            type: sequelize.QueryTypes.SELECT
        }).then((result,error)=>{ 
            callback(result,error);
         });
    }
}

module.exports = new UserModel(); 