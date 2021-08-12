const express = require('express');


var router=express.Router();

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
.post(ctrUsers.user);  


module.exports = router;