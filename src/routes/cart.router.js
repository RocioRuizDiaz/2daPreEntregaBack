const { Router } = require('express');
const { cartModel } = require('../models/carts.model')
const { productsModel } = require('../models/product.model')
const router = Router();

router.get ('/', async (req, res) => {
    const result = await cartModel.find().populate('products.products');
    res.send({status: 'succes', payload: result})
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const result = await cartModel.findOne({ _id: cid }).populate('products.product')
    res.send({ status: ' succes', payload: result })
})

router.post('/', async (req, res) => {
    const result = await cartModel({})
    res.send({ status: ' succes', payload: result})

})

router.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const { product } = req.body
    const cart = await cartModel.findOne({ _id: cid })

    if(cart) {
        const products = cart.product || []

        if (products.lengt > 0){
            const find = products.find(x => x.product == product)
            if(find) {
                find.quantity++
            } else {
                products.push ({ product, quantity: 1})
            }
        }else {
            product.push({ product, quantity: 1})
        }

        await cartsModel.updateOne({ _id: cid }, { products })
        res.send({ status: 'status', payload: cart })
    } else res.status(404).json({ message: ' carrito no encontado'})
})

router.put('/:cid/products/:pid', async ( req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    const cart = await cartModel.findOne({ _id: cid})
    if (cart) {
        const products = cart.products
        const find = products.find(x => x.product == pid)

        if (find) {
            find.quantity = quantity || find.quantity + 1
            await cartModel.updateOne({ _id: cid }, { products })
            res.send({ status: 'success', payload: cart })
        } else {
            const product = await productsModel.findOne({ _id: pid })

            if (!product) {
                res.status(404).json({ message: 'Producto no encontrado' })
            }

            products.push({ product: product.id, quantity: quantity || 1})
            res.send({ status: 'subir producto al carrito', payload: cart })
        }

        await cart.save()
    } else res.status( 404 ).json({ message:'Carrito no encontrado'})

})

router.delete ('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const cart = await cartModel.find({_id: cid })

    if (cart.length > 0) {
        const products = cart[0].products
        if (products.length > 0) {
          const result = products.filter(x => x.product != pid)
          await cartModel.updateOne({ _id: cid }, { products: result })
          res.send({ status: 'product deleted', payload: cart })
        } else {
          res.status(404).json({ message: 'Producto no encontrado' })
        }
      } else res.status(404).json({ message: 'Cart no encontado' })
})
 
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartModel.find({ _id: cid })
  
    if (cart.length > 0) {
      await cartsModel.updateOne({ _id: cid }, { products: [] })
      res.send({ status: 'product deleted', payload: cart })
    } else res.status(404).json({ message: 'Cart not found' })
  })

module.exports = router;