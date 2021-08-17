const express = require('express');
const router = express.Router();
const {authUser} = require("../app.middleware/auth.middleware");
const CommentController = require("../app.controllers/comment.controllers");

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('comment routes');
});

router.post('/createComment', authUser, (req, res, next) => { CommentController.createComment(req,res); });
router.get('/getComment', authUser, (req, res, next) => { CommentController.findAll(req,res); });
router.get('/searchComment', authUser, (req, res, next) => { CommentController.search(req,res); });


module.exports = router;
