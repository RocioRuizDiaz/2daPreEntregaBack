const { Router } = require ('express')
const router = Router()


router.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  const { firstName, lastName, email, age } = req.session.user
  res.render('profile', { firstName, lastName, email, age })
})
module.exports = router;