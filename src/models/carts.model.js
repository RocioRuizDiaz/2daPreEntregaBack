const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const cartCollection = "carts";


const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
               products: {
                   type:  mongoose.Schema.Types.ObjectId,
                   ref: "products"  
               },
               id: { type: String, required: true
                },
               quantity: { type: Number, default: 0 },
        },
        ],
        default: []
    }
    
    
});

cartsSchema.plugin(mongoosePaginate);

const cartModel = mongoose.model(cartCollection, cartsSchema);

module.exports = { cartModel };