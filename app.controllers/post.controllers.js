const Joi = require("joi");
const PostModel = require("../app.models/post.models");

class PostController{
    constructor(){
        this.schema = Joi.object().keys({ 
            post_title: Joi.string().alphanum().min(3).max(30).required(),
            post_body: Joi.string().alphanum().min(3).max(30).required(),
            total_number_of_comments: Joi.number().integer().required()
        }); 
    }
    
    findAll(req,res){
        PostModel.findAll((result,error)=>{
            if(!error){
                res.status(200).json( { result });
            }
        });
    }

    findOne(req,res){
        let postID = req.params.postID;
        PostModel.findOne(postID,(result,error)=>{
            if(!error){
                res.status(200).json( { result });
            }
        });
    }

    createPost(req,res){
        let post_title = req.body.post_title, 
        post_body = req.body.post_body;

        let params = [ post_title, post_body ];
        PostModel.createPost(params, (result,error)=>{
            if(!error){
                //console.log("result =>",result);
                res.status(200).json({'response' : 'Post created'});
            }
        });
    }

    
}

module.exports = new PostController();