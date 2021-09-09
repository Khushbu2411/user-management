/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');

const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const jsonParser = bodyParser.json({ extended: false });

// eslint-disable-next-line import/extensions
const ctrUsers = require('../controllers/user.controller.js');

// eslint-disable-next-line import/extensions
const adminLogin = require('../controllers/login.controller.js');

router
    .route('/')
    .get(adminLogin.login);

router
    .route('/verifyLogin')
    .post(urlencodedParser, adminLogin.verifyLogin);

router
    .route('/index')
    .get(ctrUsers.index);

router
    .route('/register')
    .get(ctrUsers.create);

router
    .route('/userinfo')
    .get(ctrUsers.userinfo);

router
    .route('/users')
    .get(ctrUsers.users);

router
    .route('/user')
    .post(urlencodedParser, ctrUsers.user);

router
    .route('/user/:id')
    .get(ctrUsers.userById);

router
    .route('/update')
    .get(ctrUsers.update);

router
    .route('/user/:id')
    .put(jsonParser, ctrUsers.updateById);

router
    .route('/user/:id')
    .delete(jsonParser, ctrUsers.delete);

router
    .route('/delete')
    .get(ctrUsers.deleteEjs);

module.exports = router;
