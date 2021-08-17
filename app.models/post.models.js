const {Sequelize} = require("sequelize");
const sequelize = require('../utilities/sequelize');

class PostModel{
    constructor(){
        this.Model = sequelize.define('post', {
            post_title: { type: Sequelize.STRING },
            post_body: { type: Sequelize.STRING },
            total_number_of_comments: { type: Sequelize.INTEGER }
        },{
            tableName: 'post'
        });
        this.Model.sync();
    }

    findAll(callback){
        this.Model.findAll({order:[
            [ "total_number_of_comments" , "DESC"]
        ]}).then( (result,error) =>{
            callback(result,error);
        });
    }

    findOne(postID,callback){
        this.Model.findOne({
            where: { id: postID}
        }).then((result,error) => {
            callback(result,error);
        });
    }

    createPost(params,callback){
        let sql = 'INSERT INTO post(`post_title`,`post_body`,`total_number_of_comments`,`createdAt`,`updatedAt`) VALUES(?, ?, 0, NOW(), NOW());';
        let options = {
            replacements: params,
            type: sequelize.QueryTypes.INSERT
        }
        sequelize.query(sql,options).then( (result,error) => {
            callback(result,error);
        });
    }
}

module.exports = new PostModel();
