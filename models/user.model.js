const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true,
    },
    email:String,
    password:String,
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product",
        },
    ],
    orders: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
            date: { type: String }, 
        }
    ],
    contact:Number,
    picture:String,
});

module.exports = mongoose.model("user",userSchema);