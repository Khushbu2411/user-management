const express = require('express');

const bodyParser=require('body-parser');

var router=express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var jsonParser=bodyParser.json({extended : false });

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

router
.route('/userById/:id')
.get(ctrUsers.userById);

router
.route('/userByName/:firstname')
.get(ctrUsers.userByName);

router
.route('/filterByAge/:age')
.get(ctrUsers.filterByAge);

router
.route('/filterUsers/:value')
.get(ctrUsers.usersFilter);

router
.route('/updateById/:id')
.put(jsonParser,ctrUsers.updateById);

module.exports = router;