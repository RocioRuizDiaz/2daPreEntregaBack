const mongoose = require('mongoose');
const cartCollection = "carts";


const cartSchema =  new mongoose.Schema({
    product:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
});

cartSchema.pre('find', function (next) {
    this.populate('products.product');
    next()
});

const cartModel = mongoose.model(cartCollection, cartSchema);
module.exports = { cartModel };