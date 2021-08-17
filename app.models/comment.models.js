const {Sequelize} = require("sequelize");
const sequelize = require('../utilities/sequelize');

class CommentModel{
    constructor(){
        this.Model = sequelize.define('comment', {
            post_id: { type: Sequelize.INTEGER },
            name: { type: Sequelize.STRING },
            email: { type: Sequelize.STRING },
            body: { type: Sequelize.STRING }
        },{
            tableName: 'comment'
        });
        this.Model.sync();
    }

    findAll(callback){
        this.Model.findAll({order:[
            [ "createdAt" , "DESC"]
        ]}).then( (result,error) => {
            callback(result,error);
        });
    }

    search(params,callback){
        let sql = `SELECT * FROM comment WHERE ${params[0]} like '%${params[1]}%';`;
        sequelize.query(sql,{
            replacements: params,
            type: sequelize.QueryTypes.SELECT
        }).then((result,error)=>{ callback(result,error); });
    }

    createComment(params, callback){
        let sql = 'INSERT INTO comment(`post_id`,`name`,`email`,`body`,`createdAt`,`updatedAt`) VALUES(?, ?, ?, ?, NOw(),NOW());';
        let options = {
            replacements: params,
            type: sequelize.QueryTypes.INSERT
        }
        sequelize.query(sql,options).then( (result,error) => {
            callback(result,error);
        });
    }
}

module.exports = new CommentModel();
