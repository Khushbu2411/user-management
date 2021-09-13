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

// eslint-disable-next-line import/extensions
const auth = require('../service/auth.js');

router
    .route('/')
    .get(adminLogin.login);

router
    .route('/verifyLogin')
    .post(urlencodedParser, adminLogin.verifyLogin);

router
    .route('/index')
    .get(auth.verifyUserToken, ctrUsers.index);

router
    .route('/register')
    .get(auth.verifyUserToken, ctrUsers.create);

router
    .route('/userinfo')
    .get(auth.verifyUserToken, ctrUsers.userinfo);

router
    .route('/users')
    .get(auth.verifyUserToken, ctrUsers.users);

router
    .route('/user')
    .post(urlencodedParser, auth.verifyUserToken, ctrUsers.user);

router
    .route('/user/:id')
    .get(auth.verifyUserToken, ctrUsers.userById);

router
    .route('/update')
    .get(auth.verifyUserToken, ctrUsers.update);

router
    .route('/user/:id')
    .put(jsonParser, auth.verifyUserToken, ctrUsers.updateById);

router
    .route('/user/:id')
    .delete(jsonParser, auth.verifyUserToken, ctrUsers.delete);

router
    .route('/delete')
    .get(auth.verifyUserToken, ctrUsers.deleteEjs);

module.exports = router;
