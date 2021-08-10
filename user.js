//vreate node-js server using express
const express = require('express');
var bodyParser = require('body-parser');


//express app
const app= express();

app.use(express.static('htmldoc'));

//connect to db
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user-management";
MongoClient.connect(url, function(err, db) {
  if (err)
    console.log(err);
  else{
    console.log('connected to db');
  }}
);


//app.use(express.json()); // to support JSON-encoded bodies
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get('/create',(req,res) =>{
    res.sendFile('./htmldoc/users.html', {root: __dirname}); 
})

app.post('/add',(req,res)=>{
  console.log('Got body:', req.body);
  res.sendStatus(200);
});


app.listen(3000);

