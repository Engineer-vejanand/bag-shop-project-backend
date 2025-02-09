const Category = "../models/category.model.js";

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