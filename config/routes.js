const express = require('express');

const bodyParser=require('body-parser');

var router=express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var ctrUsers=require('../controllers/user.controller.js');

router
.route('/')
.get(ctrUsers.index); 


router
.route('/create')
.get(ctrUsers.create);


router
.route('/users')
.get(ctrUsers.users);
  

router
.route('/user')
.post(urlencodedParser, ctrUsers.user);  


module.exports = router;