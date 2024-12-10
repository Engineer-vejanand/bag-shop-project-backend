const bcrypt = require("bcrypt");
const {generateAdminToken} = require("../utils/generateAdminToken.js");
const ownerModel = require('../models/owners.model.js')


module.exports.adminAccess = async function (req, res) {
  let owners = await ownerModel.find();
  let { fullname, email, password } = req.body;

  if (owners.length > 0) {
    if (owners.length == 1) {
      let owner = await ownerModel.findOne({
        email: email,
      });
      if (!owner) {
          req.flash("error","you don't have to permission to create a new owner");
          res.redirect("/owners/admin/login")
      } else {
        bcrypt.compare(password, owner.password, function (err, result) {
          if (err) {
            return res.status(500).send("An Error occured during login");
          }
          if (result) {
            let admintoken = generateAdminToken(owner);
            res.cookie("admintoken", admintoken);
            res.redirect("/owners/admin");
          } else {
            req.flash("error", "email or password incorrect");
            res.redirect("/owners/admin/login");
          }
        });
      }
    }else{
          req.flash("error","you don't have to permission to create a new owner");
          res.redirect("/owners/admin/login")
    }
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let owner = await ownerModel.create({
            email,
            password: hash,
            fullname,
          });
          let admintoken = generateAdminToken(owner);
          res.cookie("admintoken", admintoken);
          res.send("owner created successfully");
        }
      });
    });
  }
};

module.exports.adminlogout = async function(req,res){
  res.cookie("admintoken","");
  res.redirect("/owners/admin/login")
}
