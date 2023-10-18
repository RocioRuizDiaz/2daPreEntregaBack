const { Router } = require('express');
const mongoosePaginate = require('mongoose-paginate-v2');
const { cartModel } = require('../models/carts.model')
const router = Router();

router.get ('/', async (req, res) => {
    const page = parseInt(req.query.page) ||1;
    const limit = parseInt(req.query.limit) ||10;
        try {
            const options = {
                page, limit, populate: 'products.products'
            };

            const result = await cartModel.paginate({}, options);

            res.send ({ result: "succes", carts: result.docs, totalCarts: result.total})
        } catch (error) {
            console.log(error)
            res.status(500).send({ result: "Error", message: "Ha ocurrido un error al obtener los carritos paginados." });
        }
})

router.post('/', async (req, res) => {
    const { products} = req.body;
    try {
        const newCart = new cartModel({products});
        await newCart.save();
        res.status(201).send({ result: "Success", message: "Carrito creado correctamente." });
    } catch(error){
        res.status(500).send({ result: "Error", message: "Ha ocurrido un error al obtener carrito " });
    }
 

})

router.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const  productToReplace = req.body
    if (!id || !title || !category ||  !price || !stock || !image){
        res.send({ status: error, error: "Faltan parámetros"})
    }
    let result = await productModel.updateOne({ _id: pid }, productToReplace)
    res.send({result: "Success", payload: result})


})

router.delete("/:cartId/products/:pId", async (req, res) => {
    const cartId = req.params.cartId;
    const pId = req.params.pId

    try {
        const cart = cartModel.findById(cartId)

        if (!cart) {
            return res.status(404).send({ result: "Error", message: "Carrito no encontrado." });
        }
        const productIndex = cart.products.findIndex(product => product._id == pId);

        if (productIndex === -1) {
            return res.status(404).send({ result: "Error", message: "Producto no encontrado en este carrito." });
        }

        cart.products.splice(productIndex, 1);

        await cart.save();

        res.send({ result: "Success", message: "Producto eliminado correctamente del carrito." });
    } catch (error) {
        res.status(500).send({ result: "Error", message: "Ha ocurrido un error al eliminar el producto del carrito." });
    }
    
})

router.put('/:cartId/products/:pId', async ( req, res) => {
    const cartId = req.params.cartId;
    const pId = req.params.pId;
    const  newQuantity = req.body.quantity;

    try {
        const cart = await cartModel.findById(cartId);
        
        if (!cart) {
            return res.status( 404 ).json({ message:'Carrito no encontrado'})
           
        }
        
        const product = cart.products.find(product => product._id == pId);

        if (!product) {
                 return res.status(404).json({ message: 'Producto no encontrado' })
                }
            
            product.quantity = newQuantity;
            await cart.save();
            
        res.send({ result: "Success", message: "Cantidad del producto actualizada correctamente en el carrito." })
    } catch (error) {
        res.status(500).send({result: "Error", message: " Error al actualizar la cantidad del producto en el carrito." })
    }

})

router.delete ('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    
    try {
        const cart = await cartModel.findById(cartId)

        if (!cart) {
           return res.status(404).send({ result:  "Error", message: "Carrito no encontrado." })
         } 
          
        cart.products = []

        await cart.save()   
        res.send({ result: "Success", message: "Todos los productos han sido eliminados del carrito." })
    } catch (error){
        res.status(500).send({ result: "Error", message: " Error al eliminar los productos del carrito." })
    }

});

module.exports = router;