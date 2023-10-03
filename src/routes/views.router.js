const { Router } = require ('express')
const { productsModel } = require ('../models/product.model.js')
const router = Router()

router.get('/', async (req, res) => {
  res.render('login', { session: req.session.user })
})

router.get('/login', async (req, res) => {
  res.render('login', { session: req.session.user })
})

router.get('/register', (req, res) => {
  res.render('register', { session: req.session.user })
})

router.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('login')
  }
  const { firstName, lastName, email, age } = req.session.user
  res.render('profile', { firstName, lastName, email, age, session: req.session.user })
})

router.get('/products', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('login')
  }
  const products = await productsModel.find().lean()
  const { email } = req.session.user

  res.render('products', { email, session: req.session.user, products })
})

router.get('/logout', async (req, res) => {
  delete req.session.user
  res.redirect('login')
})

module.exports = router;