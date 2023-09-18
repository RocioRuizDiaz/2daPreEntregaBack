const { Router } = require('express');
const mongoosePaginate = require('mongoose-paginate-v2');
const { cartModel } = require('../models/cart.model');

const router = Router()


//Endpoints
router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const options = {
            page,
            limit,
            populate: 'products.product',
        }
    
        const result = await cartModel.paginate({}, options);

        res.send({ result: "Success", carts: result.docs, totalCarts: result.total });

    } catch(error) {
        console.log("Error al seleccionar carrito ")
    }
})


router.post("/", async (req, res) => {
    const { products } = req.body;
    try {
        const newCart = new cartModel({ products});
         await newCart.save();
         return res.status(400).send({result: "succes", message: "Carrito creado correctamente"})


    } catch (error) {
        return res.status(500).send({result: "error", message: "Error al crear carrito"})

    }
});


router.put("/:cid", async (req, res) => {
    let { cid } = req.params

    let productsToReplace =req.body
    if(!id || !title || !category || !price || !keywords || !url || !stock || !thumbnail){
        response.send({status: error, error: "faltan parametros"})

    }
    let result = await productsModel.updateOne({ _id: pid}, productsToReplace)
    res.status(500).send({ result: "Error", message: "Ha ocurrido un error al actualizar la cantidad del producto" });

})

router.delete("/:cartId/products/:pId", async (req, res) => {
    const cartId = req.params.cartId;
    const pId = req.params.pId;

    try {
        const cart = await cartModel.findById(cartId);

        if (!cart) {
            return res.status(404).send({ result: "Error", message: "Carrito no encontrado." });
        }
        const productIndex = cart.product.findIndex(product => product._id == pId);

        if (productIndex === -1) {
            return res.status(404).send({ result: "Error", message: "Producto no encontrado en carrito." });
        }

        cart.product.splice(productIndex, 1);

        await cart.save();

        res.send({ result: "Success", message: "Producto eliminado correctamente del carrito." });
    } catch (error) {
        res.status(500).send({ result: "Error", message: "Ha ocurrido un error al eliminar el producto del carrito." });
    }

})

router.put("/cart/:cartId/products/:pId", async (req, res) => {
    let { cartId } = req.params
    const pId = req.params.pId;
    const newQuantity = req.body.quantity; 

    try {
        const cart = await cartModel.findById(cartId);

        if (!cart) {
            return res.status(404).send({ result: "Error", message: "Carrito no encontrado." });
        }

        const product = cart.product.find(product => product._id == pId);

        if (!product) {
            return res.status(404).send({ result: "Error", message: "Producto no encontrado en este carrito." });
        }

        product.quantity = newQuantity;

        await cart.save();

        res.send({ result: "Success", message: "Cantidad del producto actualizada correctamente en el carrito." });
    } catch (error) {
        res.status(500).send({ result: "Error", message: "Ha ocurrido un error al actualizar la cantidad del producto en el carrito." });
    }
});

router.delete("/:cartId/products/:pId", async( req, res) => {
    const cartId = req.params.cartId;

    try {
        const cart = await cartModel.findById(cartId)

        if (!cart) {
            return res.status(404).send({ result: "Error", message: "Carrito no encontrado." })
        }

        cart.product = []

        await cart.save()

        res.send({ result: "Success", message: "Los productos han sido eliminados correctamente." })
    } catch (error) {
        res.status(500).send({ result: "Error", message: "Ha ocurrido un error al eliminar los productos del carrito." })
    }
})


module.exports = router