const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {type: String, required:true} ,
    description: {type: String},
    gameUrl: {type: String},
    playersCount: {
        min: {type: Number},
        max: {type: Number},
    },
    categoryId: {type: mongoose.Types.ObjectId, required:true},
    image: {type: String},
    createdBy: {type: mongoose.Types.ObjectId, required:true},
})


module.exports = mongoose.model('game', productSchema)