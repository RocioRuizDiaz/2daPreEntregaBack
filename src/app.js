const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require ('./routes/users.router')
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router")
const handlebars = require("express-handlebars");
const { generateToken, authToken} = require('../utils')
const bodyParser = require('body-parser');
const passport = require("passport")
const initializePassport = require("./config/passport.config");
const cookieParser = require("cookie-parser")
const PRIVATE_kEY = "CoderkeY"
const PORT = 8080;
//Setup
const app = express();
const server = app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`);});
server.on('error', error => console.log('Error: ', error))


// Middlewares

initializePassport(passport)
app.use(passport.initialize())
app.set(passport.session())
app.use(cookieParser())


app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Views

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

const users = []

app.post('/register', (req, res) => {
  const {name, email, password} = req.body
  const exists = users.find(user => user.email === email)
  if(exists) return res.status(400).send({status: "error", error: "El usuario ya existe"})

  const user = {
      name, email, password
  }
  users.push(user)

  const access_token = generateToken(user)
  res.send({status: "success", access_token})
})

/* app.post('/login', (req, res) => {
    const {email, password} = req.body    
    const user = users.find(user => user.mail === email && user.password === password)
    console.log(user)
    if(!user) return res.status(400).send({status: "error", error:"Credencial inválida"})

    const access_token = generateToken(user)
    res.send({status: "success", access_token})
}) */

app.get("/current", authToken ,(req, res) =>{
  res.send({status: "success", payload: req.user})
  console.log
})


mongoose.connect('mongodb+srv://belenbauti0310:oedEluC5OmE2Z8GR@cluster0.wunlfq4.mongodb.net/?retryWrites=true&w=majority')
 .then(()=>{
    console.log("Conectado a la DB de Mongo Atlas")
})
.catch(error=>{
    console.log("Error en la conexion", error)
})

app.use("/api/users", usersRouter)
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter)
