const express = require('express');
//const cookieParser = require("cookie-parser")
const session = require('express-session');
const bodyParser = require('body-parser');
const handlebars = require("express-handlebars");
const MongoStore = require("connect-mongo");
const initializePassport = require("./config/passport.config");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router")
const passport = require("passport")
const sessionsRouter = require ("./routes/sessions.router.js")
const viewsRouter = require ("./routes/views.router.js")
const {dirname } = require ("../utils.js")

//Setup
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`);});
server.on('error', error => console.log('Error: ', error))


// Views

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


// Middlewares

initializePassport()
app.use(
  session({
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({ extend: true}))

/*
app.use(cookieParser());

//ruta para vista
app.get("/", (req, res) => {
    res.sendFile(__dirname + "index.html")
})

app.post("/setCookie", (req, res) => {
    const { user } = req.body
    res.cookie("user", "user", {maxAge:3000}).send("Cookie creada")
})

app.get("/getCookie", (req, res) => {
    const userCookie = req.cookies.user
    console.log("my cookie", userCookie)
    res.send("cookie mostrada en consola")
})

app.get("/deleteCookie", (req, res) => {
    res.clearCookie("coderCookie").send("cookie eliminada")
})*/







mongoose.connect('mongodb+srv://belenbauti0310:oedEluC5OmE2Z8GR@cluster0.wunlfq4.mongodb.net/?retryWrites=true&w=majority')
 .then(()=>{
    console.log("Conectado a la DB de Mongo Atlas")
})
.catch(error=>{
    console.log("Error en la conexion", error)
})


app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter)
