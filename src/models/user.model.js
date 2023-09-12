const mongoose = require("mongoose");
const userColecction = "user";

const userSchema = new mongoose.Schema({
    nombre:{ type: String, required: true },
    apellido: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    id: { type: Number, required: false, max: 100 }

})

const userModel = mongoose.model(userColecction, userSchema)

module.exports={userModel}