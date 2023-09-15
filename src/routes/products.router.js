const { Router } = require("express");
const { productsModel } = require("../models/products.model");


const router = Router();


router.get("/", async(req,res) =>{
    try{
        let users = await productsModel.find();
        res.send({result: "success", payload: users });
    } catch (error){
        res.send({status: error, error: "Error al obtener informacion."});
    }
});
router.post("/", async (req, res) => {
    let { title, stock, category, price, thumbnail } = req.body;
    if (!title || !stock || !category || !price || !thumbnail) {
    res.send({ status: "error", error: "Falta parametro"});
    } 
    let result = await productsModel.create({title, stock, category, price, thumbnail })
    res.send({result: "succes", payload: result });
    
})
router.put("/:uid", async (req, res) => {
    let { uid } = req.params;

    let userToReplace = req.body; 
     if (!userToReplace.title || !userToReplace.stock || !userToReplace.category || !userToReplace.price || !userToReplace.thumbnail){
        res.send({ status: "error", error: "Falta parametro"});
    }
     let result = await productsModel.updateOne({ _id: uid}, userToReplace);
     res.send({result: "succes", payload: result })
});
router.delete("/:uid", async (req, res) => {
    let { uid } = req.params
    let result = await productsModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })

});

module.exports = router;
