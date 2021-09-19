/* eslint-disable no-path-concat */
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

const cookieParser = require('cookie-parser');

// import router file
const routes = require('./config/routes');

app.use(express.json());

app.use(cookieParser());

app.use('/', routes);

// register view enignes
app.set('view engine', 'ejs');

// Use static files
app.use(express.static('public/css'));

// eslint-disable-next-line prefer-template
app.use(express.static(__dirname + '/public'));

app.use(express.static('public/js'));

console.log('listening to the port: ', PORT);

app.listen(PORT);
