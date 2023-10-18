const express = require("express");
const { usersModel } = require("../models/users.model.js");
const jwt = require ('jsonwebtoken')
const { createHash, isValidatePassword} = require ('../../utils')
const passport = require ('passport')
const router = express.Router();

router.get("/", async(req,res) =>{
    try{
        
         let users = await usersModel.find()
               res.send({result: "success", payload: users})
    } catch (error){
        console.log(error)
    }
});

router.get("/login", async(req, res) => {
    res.render("login")
})


router.post("/", async (req, res) => {
    let { nombre, apellido, correo } = req.body;
    if (!nombre || !apellido || !correo) {
    res.send({ status: "error", error: "Falta parametro"});
    } 
    
    let result = await usersModel.create({nombre, apellido, correo});
    res.send({result: "succes", payload: result })
    
})
router.put("/:uid", async (req, res) => {
    let { uid } = req.params;

    let userToReplace = req.body; 
     if (!userToReplace.nombre || !userToReplace.apellido || !userToReplace.correo){
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

router.get("/failregister", (req, res) =>{
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




module.exports = router