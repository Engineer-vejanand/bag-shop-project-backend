const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    parentCategory: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category' 
    },
},{timestamps:true});

module.exports = mongoose.model("Category",categorySchema);