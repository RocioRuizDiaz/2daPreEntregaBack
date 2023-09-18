const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')
const productCollection = "products";


const productsSchema = new mongoose.Schema({
    title: { type: String, required: true, max:30},
    category: {type: String,required: true, max:100},
    price: {type: Number,required: true,},
    keywords: {type: String, required: true},
    url: {type: String, required: true},
    stock: {type: Number,required: true,max:150},
    thumbnail: {type: String, required: true,max:200},    
})


productsSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model("productCollection", productsSchema);
module.exports = { productsModel };