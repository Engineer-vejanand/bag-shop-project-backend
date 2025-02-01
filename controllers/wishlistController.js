const mongoose = require("mongoose");
const { Product } = require("../models/wishlist.model.js");
const {Wishlist} = require("../models/category.model.js");

module.exports.addtoWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        if(!userId){
            return res.status(400).json({message: " missing userId" });
        };

        if(!productId){
            return res.status(400).json({ message: "missing product id"})
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(400).json({ message: "Product not found" });
        }

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: userId,
                products: [productId],
            });
        } else {
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({ message: "Product is already in the wishlist" });
            }
            wishlist.products.push(productId);
            await wishlist.save(); 
        }
     
        res.status(201).json({message:"added to wishlist successfully",wishlist});
     
    } catch (error) {
        res.status(500).json({ message: " Error adding to wishlist", error: error.message});
    }
}