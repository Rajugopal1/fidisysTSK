const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const productSchema = new mongoose.Schema({
    name: {type: String, required:true} ,
    createdBy: {type: mongoose.Types.ObjectId, required:true},
})


module.exports = mongoose.model('category', productSchema)