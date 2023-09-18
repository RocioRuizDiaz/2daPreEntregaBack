const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./routes/users.router");
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router")
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


mongoose.connect('mongodb+srv://belenbauti0310:oedEluC5OmE2Z8GR@cluster0.wunlfq4.mongodb.net/?retryWrites=true&w=majority')
 .then(()=>{
    console.log("Conectado a la DB de Mongo Atlas")
})
.catch(error=>{
    console.log("Error en la conexion", error)
})



app.use("/api/users", userRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter)
