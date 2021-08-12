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


module.exports.user= async(req,res) => {
    var likesArr=req.body.likes.split(",");
    var myObj= {firstname: req.body.firstName, lastname: req.body.lastName, email: req.body.email,
    password: req.body.password, mobile: req.body.mobile, likes: likesArr};
      let db = await connectDB();
      var existEmail = await db.collection("user").findOne({email:myObj['email']});
      var existMobile = await db.collection("user").findOne({mobile:myObj['mobile']});
      if(existEmail!=null){
        res.render('404',{message: "Email already exists"});
            }
      else if(existMobile!=null){
       res.render('404',{message:'Mobile already exists'});
      }  
      else if(myObj['mobile'].length!=10){
         res.render('404',{message:'Mobile digit value should be equal to 10'});
      }
      else{
       const result = await db.collection("user").insertOne(myObj);
       res.send('<h3>File successfully inserted.</h3>');
      
       }
};

