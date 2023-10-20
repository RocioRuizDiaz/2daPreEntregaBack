const express = require("express");
const usersModel  = require("../models/users.model.js");
const { createHash, isValidatePassword} = require ('../../utils')
const passport = require ('passport')
const jwt = require ('jsonwebtoken')
const router = express.Router();


router.get("/login", async(req, res) => {
    res.render("login")
})


router.get("/", async(req,res) =>{
    try{
        
         let users = await usersModel.find()
               res.send({result: "success", payload: users})
    } catch (error){
        console.log(error)
    }
});

router.get("profile", async (req, res) => {
    if(!req.session.user) {
        return res.redirect("login");
    }

    const { first_name, last_name, email, age } = req.session.user;

    res.render("profile", { first_name, last_name, age, email });
});


router.post("/", async (req, res) => {
    let { first_name, last_name, email, password  } = req.body;
    if (!first_name || !last_name ||  !email || !password) {
    res.send({ status: "error", error: "Falta parametro"});
    } 
    
    let result = await usersModel.create({first_name, last_name, email, password});
    res.send({result: "succes", payload: result })
    
    if(!user) {
        return res.status(400).render("login", { error: "Error en password" })
    }

    res.redirect("/api/usuarios/profile");
})

router.get("/logout", async (req, res) => {
    delete req.session.user;
    res.redirect("login");
  });


router.put("/:uid", async (req, res) => {
    let { uid } = req.params;

    let userToReplace = req.body; 
     if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email){
        res.send({ status: "error", error: "Falta parametro"});
    }
     let result = await usersModel.updateOne({ _id: uid}, userToReplace);
     res.send({result: "succes", payload: result })
});
router.delete("/:uid", async (req, res) => {
    let  uid  = req.params
    let result = await usersModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })

});

router.get("/faillogin", (req, res) =>{
    console.log("Error de auntenticacion")
    res.send({error: "Error de auntenticacion"})
})

router.post("/login", (req, res) => {
    const { email, password} = req.body

    if( email == "rocio03@hotmail.com" && password == "passcoder"){
        let token = jwt.sign({email, password}, "coderSecret", {expiresIn: "24h"})
        res.cookie("coderCookieToken", token, {
            maxAge: 60*60*1000,
            httpOnly: true 
        }).send({message: "Logueado correctamente"})
    }else {
        res.render("failregister")
    }
})

router.get("/current", passport.authenticate( "jwt", {session: false}), (req, res) => {
    res.send(req.user)
})




module.exports = router;