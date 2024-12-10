const userModel = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken.js')

module.exports.registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({email:email});
    if(user) return res.status(401).send("user have already account please login")

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password:hash,
            fullname,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          res.send("user created successfully");
        }
      });
    });
  } catch (error) {
    res.send(err.message);
  }
};

module.exports.loginUser = async function (req,res) {
  let {email, password} = req.body;

  let user = await userModel.findOne({email:email});
  if(!user) {
     req.flash("error","email or password is not correct")
     res.redirect("/");
  }
  else{
  bcrypt.compare(password , user.password , function(err,result){
    if(err){
      return res.status(500).send("An Error occured during login");
    }
    if(result){
      let token = generateToken(user);
      res.cookie("token",token);
      res.redirect("/shop");
    }
    else{
       req.flash("error", "email or password incorrect");
       res.redirect("/")
    }
  })
}
}

module.exports.logout = function(req,res){
  res.cookie("token","");
  res.redirect("/");
}