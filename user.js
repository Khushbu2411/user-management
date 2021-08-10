//vreate node-js server using express
const express = require('express');
var bodyParser = require('body-parser');


//express app
const app= express();


//register view enignes
app.set('view engine', 'ejs');

app.use(express.static('htmldoc'));


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user-management";

//app.use(express.json()); // to support JSON-encoded bodies
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res) =>{
  res.render('index');
    //res.sendFile('./htmldoc/users.html', {root: __dirname}); 
})

app.get('/create',(req,res) =>{
  res.render('users');
    //res.sendFile('./htmldoc/users.html', {root: __dirname}); 
})

app.post('/add',(req,res)=>{
  console.log('Got body:', req.body);
  var likesArr=req.body.likes.split(",");
  console.log(likesArr);

  //connect to db
  MongoClient.connect(url, function(err, db) {
    if (err)
      console.log(err);
    else{
      console.log('connected to db');
      var dbo=db.db("user-management");
      var myobj = { firstname: req.body.firstName, lastname: req.body.lastName, email: req.body.email,
        password: req.body.password, mobile: req.body.mobile, likes: likesArr};
    dbo.collection("user").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  
  }}
);
  res.send('<h1>File successfully inserted.</h1>');
});

app.get('/users',(req,res) =>{
  MongoClient.connect(url, function(err, db) {
    if (err)
      console.log(err);
    else{
      var dbo=db.db("user-management");
      dbo.collection('user').find({}, function (err, element) {
        if (err) {
            console.log(err);
        } else {
          element.forEach(item => {
            res.send(item);
          });
        }
        //res.render("display", {element});    
 
    });
  }});
});


app.listen(3000);

