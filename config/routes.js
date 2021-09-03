/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');

const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const jsonParser = bodyParser.json({ extended: false });

// eslint-disable-next-line import/extensions
const ctrUsers = require('../controllers/user.controller.js');

router
    .route('/')
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
    .route('/user/:id')
    .put(jsonParser, ctrUsers.updateById);

module.exports = router;
