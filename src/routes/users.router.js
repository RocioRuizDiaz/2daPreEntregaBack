const { Router } = require("express");

const { userModel } = require("../models/user.model");

const router = Router();

router.get("/", async(req,res) =>{
    try{
        let users = await userModel.find();
        res.send({result: "success", payload: users });
    } catch (error){
        res.send({status: error, error: "Error al obtener informacion."});
    }
});
router.post("/", async (req, res) => {
    let { nombre, apellido, correo } = req.body;
    if (!nombre || !apellido || !correo) {
    res.send({ status: "error", error: "Falta parametro"});
    } 
    
    let result = await userModel.create({nombre, apellido, correo});
    res.send({result: "succes", payload: result })
    
})
router.put("/:uid", async (req, res) => {
    let { uid } = req.params;

    let userToReplace = req.body; 
     if (!userToReplace.nombre || !userToReplace.apellido || !userToReplace.correo){
        res.send({ status: "error", error: "Falta parametro"});
    }
     let result = await userModel.updateOne({ _id: uid}, userToReplace);
     res.send({result: "succes", payload: result })
});
router.delete("/:uid", async (req, res) => {
    let { uid } = req.params
    let result = await userModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })

});
module.exports = router