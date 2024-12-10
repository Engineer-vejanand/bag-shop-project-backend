const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owners.model.js");

module.exports = async function (req,res,next){
    if(!req.cookies.admintoken){
        req.flash("error" , "you need to login first");
        return res.redirect("/owners/admin/login");
    }

    try{
        let decoded = jwt.verify(req.cookies.admintoken , process.env.JWT_ADMIN_KEY);
        let owner = await ownerModel.findOne({email:decoded.email}).select("-password");

        req.owner = owner;
        next();
    } catch(error){
        req.flash("error", "something went wrong");
        res.redirect("/owners/admin/login");
    }
}