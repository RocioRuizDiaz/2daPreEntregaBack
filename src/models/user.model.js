const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')

const userColecction = "user";

const userSchema = new mongoose.Schema({
    nombre:{ type: String, required: true },
    apellido: { type: String, required: true, max: 100 },
    correo: { type: String, required: true },
    

});

userSchema.plugin(mongoosePaginate)
const userModel = mongoose.model(userColecction, userSchema)

module.exports={userModel}