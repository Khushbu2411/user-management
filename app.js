/* eslint-disable no-path-concat */
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const app = express();

// import router file
const routes = require('./config/routes');

app.use('/', routes);

// register view enignes
app.set('view engine', 'ejs');

// Use static files
app.use(express.static('public/css'));

// eslint-disable-next-line prefer-template
app.use(express.static(__dirname + '/public'));

app.use(express.static('public/js'));

app.listen(3000);
