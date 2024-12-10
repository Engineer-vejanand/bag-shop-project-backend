const express = require('express');
const router = express.Router();

const bcrypt = require("bcrypt");
const {generateAdminToken} = require("../utils/generateAdminToken.js")
const {adminAccess , adminlogout} = require("../controllers/adminAuthController.js")

const ownerModel = require('../models/owners.model.js');
const productModel = require("../models/product.model.js");

const isAdminAccess = require("../middlewares/isAdminAccess.js")

if(process.env.NODE_ENV === "development"){
    router.post("/create",async function(req,res) {
        let owners = await ownerModel.find();
        if(owners.length > 0) {
            return res
            .status(503)
            .send("you don't have to permission to create a new owner");
        }

        let {fullname,email,password} = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });

       res.status(201).send(createdOwner);

    });
}

router.get("/admin/login" , function(req,res){
    let error = req.flash("error")
    res.render("owner-login",{error,loggedin:false})
})

router.get("/createproduct",isAdminAccess,function(req,res) {
    let success = req.flash("success")
    res.render("createproducts",{success});
})

router.get("/admin",isAdminAccess,async function(req,res){
    let products = await productModel.find();

    res.render("admin",{products})
})

router.post("/create",adminAccess);


router.get("/admin/logout",isAdminAccess,adminlogout);


module.exports = router;