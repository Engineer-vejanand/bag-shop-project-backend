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

module.exports.removeFromWishlists = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        if(!userId){
            res.status(400).json({ message:"userid missing"});
        }

        if(!productId){
            res.status(400).json({ message:"product id missing"});
        }

        const wishlist = await Wishlist.findOne({ user: userId });
    
        if (!wishlist) {
          return res.status(404).json({ message: "Wishlist not found" });
        }
    
        if (!wishlist.products.includes(productId)) {
          return res.status(404).json({ message: "Product not found in wishlist" });
        }
    
        wishlist.products = wishlist.products.filter(
          (product) => product.toString() !== productId
        );
    
        await wishlist.save();

        res.status(201).json({ message:"produt removing from wishlist"})
        
    } catch (error) {
        res.status(500).json({ message:"server error",error:error.message});
    }
}

module.exports.getWishlist = async (req, res) => {
    try {
        // const { userId } = req.params;
        const userId = req.user.id
    
        if (!userId ) {
          return res.status(400).json({ message: " missing userId" });
        }
        if ( !mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid userId" });
        }
    
        const wishlist = await Wishlist.findOne({ user: userId }).populate(
          "products"
        );
    
        if (!wishlist) {
          return res.status(404).json({ message: "Wishlist not found" });
        }
    
        res.status(201).json({ wishlist }) 
      } catch (error) {
        res.status(500).json({ message: "Error fetching wishlist", error: error.message });
      }
}