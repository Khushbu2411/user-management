//import connection file
const connectDB = require("../helpers/connectDB");

module.exports.index=(req,res) =>{
    res.render('index');
};


module.exports.create=(req,res) =>{
    res.render('users');
};


module.exports.users=async(req,res) =>{
    let db = await connectDB();
    const data = await db.collection("user").find().toArray();
    res.render('display',{data});
};

module.exports.usersFilter=async(req,res) =>{
    let db = await connectDB();
    var value=req.params.value;
    const projection = {value, "_id":0};
    const data = await db.collection("user").find().project(projection).toArray();
    res.send(data);
};


module.exports.user= async(req,res) => {
    var likesArr=req.body.likes.split(",");
    var myObj= {firstname: req.body.firstName, lastname: req.body.lastName, email: req.body.email,
    password: req.body.password, age:req.body.age, mobile: req.body.mobile, likes: likesArr};
      let db = await connectDB();
      var existEmail = await db.collection("user").findOne({email:myObj['email']});
      var existMobile = await db.collection("user").findOne({mobile:myObj['mobile']});
      if(existEmail!=null){
        res.render('404',{message: "Email already exists"});
            }
      else if(existMobile!=null){
       res.render('404',{message:'Mobile already exists'});
      }  
      else if(myObj['password'].length<8){
          res.render('404',{message:'Password length is too small. It should be minimum 8 character long'});
      }
      else if(myObj['mobile'].length!=10){
         res.render('404',{message:'Mobile digit value should be equal to 10'});
      }
      else{
       const result = await db.collection("user").insertOne(myObj);
       res.send('<h3>File successfully inserted.</h3>');
       }
};

module.exports.userById= async(req,res)=>{
    let db = await connectDB();
    const data = await db.collection("user").find({'id':req.params.id}).toArray();
    res.send(data);
};

module.exports.userByName = async(req,res)=>{
    let db = await connectDB();
    const data = await db.collection("user").find({'firstname':req.params.firstname}).toArray();
    res.send(data);
};

module.exports.filterByAge = async(req,res) => {
  let db= await connectDB();
  var age=parseInt(req.params.age);
  const projection ={"firstname":1,"lastname":1,"_id":0};
  var data= await db.collection("user").find({'age':age}).project(projection).sort({'firstname':1}).toArray();
  res.send(data);
};

module.exports.updateById = async(req,res) =>{
    let db= await connectDB();
    const result= await db.collection("user").updateOne({'id':req.params.id},{'$set':req.body});
    res.send("Successfully updated");
};

