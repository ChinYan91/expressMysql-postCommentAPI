const Joi = require("joi");
const CommentModel = require("../app.models/comment.models");

class CommentController{
    findAll(req,res){
        CommentModel.findAll((result,error)=>{
            if(!error){
                res.status(200).json({result});
            }
        });
    }

    search(req,res){
        let key = req.query.key,
        value = req.query.value;

        let params = [key,value];
        CommentModel.search(params,(result,error)=>{
            if(!error){
                res.status(200).json({result});
            }
        })
    }

    createComment(req,res){
        let post_id = req.body.post_id,
        email = req.body.email,
        name = req.body.name,
        body = req.body.body;

        let param = [ post_id, name, email, body ];
        CommentModel.createComment(param, (result,error)=>{
            if(!error){
                res.status(200).json({result: "comment created"});
            }
        });
    } 
}

module.exports = new CommentController();