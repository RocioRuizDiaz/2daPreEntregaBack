const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')


const productsSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 30 },
    category: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    stock: { type: Number },
    image: { type: String, required: true },
})

productsSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model("products", productsSchema);
module.exports = { productsModel };