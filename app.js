//create node-js server using express
const express = require('express');

//express app
const app= express();
 
//import connection file
const connectDB = require("./helpers/connectDB");

//register view enignes
app.set('view engine', 'ejs');

//use static files
app.use(express.static('public/css'));

app.use(express.urlencoded({ extended: true }));

//Index page
app.get('/',(req,res) =>{
  res.render('index');
})

//Form page
app.get('/create',(req,res) =>{
  res.render('users');
})

//Create user
app.post('/user',async(req,res)=>{
  var likesArr=req.body.likes.split(",");
    var myObj= {firstname: req.body.firstName, lastname: req.body.lastName, email: req.body.email,
    password: req.body.password, mobile: req.body.mobile, likes: likesArr};
    let db = await connectDB();
    const result = await db.collection("user").insertOne(myObj);
    res.send('<h3>File successfully inserted.</h3>');
});

//Display users
app.get('/users',async(req,res) =>{
  let db = await connectDB();
  const data = await db.collection("user").find().toArray();
  res.render('display',{data});
});


app.listen(3000);
