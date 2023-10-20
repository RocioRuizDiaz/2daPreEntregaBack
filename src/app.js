const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const handlebars = require("express-handlebars");
const usersRouter = require ('./routes/users.router');
const passport = require("passport");
const initializePassport = require("./config/passport.config");
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router")
const { generateToken, authToken} = require('../utils')
const cookieParser = require("cookie-parser")
const PRIVATE_kEY = "CoderkeY"
const PORT = 8080;

//Setup
const app = express();


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

app.use(express.json());

//Conexion a DB
mongoose.connect('mongodb+srv://belenbauti0310:oedEluC5OmE2Z8GR@cluster0.wunlfq4.mongodb.net/?retryWrites=true&w=majority')
 .then(()=>{
    console.log("Conectado a la DB de Mongo Atlas")
})
.catch(error=>{
    console.log("Error en la conexion", error)
})

//Routes

app.use("/api/users", usersRouter)
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter)
app.use(express.json());


app.get("/current", authToken ,(req, res) =>{
  res.send({status: "success", payload: req.user})
  console.log
})

//PORT
const server = app.listen(PORT, () =>
 {console.log(`Server is running on http://localhost:${PORT}`);});
server.on('error', error => console.log('Error: ', error))