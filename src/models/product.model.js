const mongoose = require("mongoose");

const productCollection = "products";


const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true,},
    stock: {type: Number,required: true,},
    category: {type: String,required: true,},
    price: {type: Number,required: true,},
    thumbnail: {type: String},    
})

const productModel = mongoose.model("productCollection", productSchema);
module.exports = { productModel };