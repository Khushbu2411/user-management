const express = require('express');
const app= express();
 
//import router file
var routes=require('./config/routes'); 

app.use("/",routes);

//register view enignes
app.set('view engine', 'ejs');

//use static files
app.use(express.static('public/css'));

app.use(express.urlencoded({ extended: true }));

app.listen(3000);
