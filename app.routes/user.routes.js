const express = require('express');
const router = express.Router();
const UserController = require("../app.controllers/user.controllers")
const {authUser} = require("../app.middleware/auth.middleware");

/* GET users listing. */
router.get('/',(req, res, next) => { res.send('respond with a resource'); });

router.post('/register', (req, res, next) => { UserController.register(req,res); });
router.post('/login', (req,res,next) => { UserController.login(req,res); });
router.post('/renewToken', (req, res, next) => { UserController.renewToken(req,res); });
router.post('/testAuth',authUser, (req,res, next)=>{ res.status(200).send("accessed"); });

module.exports = router;
