const express = require('express');
const router = express.Router();
const {authUser} = require("../app.middleware/auth.middleware");
const PostController = require("../app.controllers/post.controllers");

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('post routes');
});

router.post('/createPost',authUser, (req,res, next) => { PostController.createPost(req,res);});
router.get('/getPost', authUser, (req,res, next) => { PostController.findAll(req,res);});
router.get('/getPost/:postID',authUser, (req,res, next) => { PostController.findOne(req,res);});
module.exports = router;
