const { Category } = require("../models/category.model.js");
const { Product } = require("../models/product.model.js");
const { Wishlist } = require("../models/wishlist.model.js");

module.exports.createCategory = async (req, res) => {
    try {
      const { name, description, parentCategoryName} = req.body;
 
      if(!name){
         return res.status(400).json({ message: "category name is required"});
      }
 
      let parentCategoryId = null;
 
      if(parentCategoryName){
         const parentCategory = await Category.findOne({ name:parentCategoryName});
         if(!parentCategory){
             return res.status(404).json({message:"parent category not found"})
         }
         parentCategoryId = parentCategory._id;
      }

 
      const user = req.user;
      console.log("User creating category:", user);
 
      const category = await new Category({
         name,
         description,
         parentCategory: parentCategoryId || null,
      });
 
      await category.save();
 
      res.status(201).json({ message:"created successfully",category});
 
    } catch (error) {
      res.status(500).json({ message: "Error creating category",error: error.message});
    }
 };

module.exports.getAllCategory = async (req, res) => {
try {
    const categories = await Category.find().populate('parentCategory','name');
    res.status(201).json({message:"success",categories});
} catch (error) {
    res.status(500).json({message:"Error fetching categories",error:error.message});
}
}

module.exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id).populate('parentCategory', 'name');

        if(!category){
            return res.status(404).json({ message: "category not found"});
        };

        const products = await Product.find({ category: id}).populate("category","name");
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products");
        const likedProducts = wishlist ? wishlist.products.map(product => product._id.toString()) :[];

        res.status(201).json({ message:"success", category, products, likedProducts});
        
    } catch (error) {
        res.status(500).json({ message:"error in getcategory",error:error.message});
    }
}