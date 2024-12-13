const express = require("express");
const router = express.Router();

const isloggedin = require("../middlewares/isLoggedin.js");
const productModel = require("../models/product.model.js");
const userModel = require("../models/user.model.js");


require("dotenv").config();

router.get("/",function(req,res){
    let error = req.flash("error");
    res.render('index',{error , loggedin:false});
})
 
router.get("/shop",isloggedin,async function (req,res){
    let products = await productModel.find(); 
    let success = req.flash("success");
    res.render("shop",{products , success});
})

router.get("/cart", isloggedin, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");
        if(user.cart.length==0){
            return res.redirect("/shop")
        }
        if (!user || !user.cart) {
            return res.render("cart", { user: {}, cart: [], bill: 0, discount: 0, price: 0 });
        }

        let discount = 0;
        let price = 0;
        let bill = 0;
        let cart = user.cart;

        let groupedCart = {};
        cart.forEach(item => {
            const name = item.name;
            if (!groupedCart[name]) {
                groupedCart[name] = { ...item._doc, quantity: 1 }; 
            } else {
                groupedCart[name].quantity += 1;
            }
            discount += Number(item.discount);
            price += Number(item.price);
            bill = Number(item.price)  - Number(item.discount) +bill;
        });

        bill = bill+20;
        res.render("cart", { user, cart: Object.values(groupedCart), bill, discount, price });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/addtocart/:productid",isloggedin, async function (req,res) {
    let user = await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","added to Cart");
    res.redirect("/shop") 
})
router.get("/addtocart/:productid",isloggedin, async function (req,res) {
    let user = await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","added to Cart");
    res.redirect("/shop") 
})

router.get("/cart/increment/:productid",isloggedin, async function (req,res) {
    let user = await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    // req.flash("success","added to Cart");
    res.redirect("/cart") 
})

router.get("/cart/decrement/:productid", isloggedin, async function (req, res) {
    try {
        
        let user = await userModel.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const productIndex = user.cart.findIndex(item => item.toString() === req.params.productid);

        if (productIndex === -1) {
            return res.status(404).send("Product not found in cart");
        }

        user.cart.splice(productIndex, 1);

        await user.save();
        res.redirect("/cart");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


router.get("/profile",isloggedin, async function(req,res){
    let user = await userModel.findOne({email:req.user.email})
    res.render("profile",{user})
})

module.exports = router;