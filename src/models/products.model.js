const mongoose = require("mongoose");

const productCollection = "products";


const productsSchema = new mongoose.Schema({
    title: { type: String, required: true,},
    stock: {type: Number,required: true,},
    category: {type: String,required: true,},
    price: {type: Number,required: true,},
    thumbnail: {type: String},    
})

const productsModel = mongoose.model("productCollection", productsSchema);
module.exports = { productsModel };