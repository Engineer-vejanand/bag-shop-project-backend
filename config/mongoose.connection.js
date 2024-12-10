const mongoose = require('mongoose');
const config = require('config')
// require('dotenv').config();

mongoose.connect(`${config.get("MONGODB_URI")}`+`/bag-shop`)
.then(function(){
    console.log("MONGODB CONNECTED SUCCESSFULLY!!!"); 
})
.catch(function(err){
    console.log(err); 
})

module.exports = mongoose.connection;