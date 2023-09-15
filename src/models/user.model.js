const mongoose = require("mongoose");
const userColecction = "user";

const userSchema = new mongoose.Schema({
    nombre:{ type: String, required: true },
    apellido: { type: String, required: true, max: 100 },
    correo: { type: String, required: true },
    id: { type: Number, required: false, max: 100 }

})

const userModel = mongoose.model(userColecction, userSchema)

module.exports={userModel}