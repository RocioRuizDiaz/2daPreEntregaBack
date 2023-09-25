const { Router } = require('express');
const { cartModel } = require('../models/carts.model')
const { productsModel } = require('../models/product.model')
const router = Router();

router.get ('/', async (req, res) => {
    const result = await cartModel.find().populate('products');
    res.send({status: 'succes', payload: result})
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const result = await cartModel.findOne({ _id: cid }).populate('products')
    res.send({ status: ' succes', payload: result })
})

router.post('/', async (req, res) => {
    const result = await cartModel.create({})
    res.send({ status: ' succes', payload: result})

})

router.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const { product } = req.body
    const cart = await cartModel.findOne({ _id: cid })

    if(cart) {
        const products = cart.products || []

        if (products.length > 0){
            const find = products.find(x => x.products == product)
            if(find) {
                find.quantity++
            } else {
                products.push ({ products: product, quantity: 1})
            }
        }else {
            products.push({ products: product, quantity: 1})
        }

        cart.products = products
        await cart.save()
        res.send({ status: 'status', payload: cart })
    } else res.status(404).json({ message: ' carrito no encontado'})
})

router.put('/:cid/products/:pid', async ( req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    const cart = await cartModel.findOne({ _id: cid})
    if (cart) {
        const products = cart.products
        const find = products.find(x => x.products == pid)

        if (find) {
            find.quantity = quantity || find.quantity + 1
            cart.products = products
            await cart.save()
            res.send({ status: 'success', payload: cart })
        } else {
            const product = await productsModel.findOne({ _id: pid })

            if (!product) {
                res.status(404).json({ message: 'Producto no encontrado' })
            }

            products.push({ products: product.id, quantity: quantity || 1})
            cart.products = products
            await cart.save()
            res.send({ status: 'subir producto al carrito', payload: cart })
        }
    } else res.status( 404 ).json({ message:'Carrito no encontrado'})

})


router.delete ('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const cart = await cartModel.find({_id: cid })

    if (cart.length > 0) {
        const products = cart[0].products
        if (products.length > 0) {
          const result = products.filter(x => x.products != pid)
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
      await cartModel.updateOne({ _id: cid }, { products: [] })
      res.send({ status: 'producto borrado', payload: cart })
    } else res.status(404).json({ message: 'Cart no encontrado' })
  })

module.exports = router;