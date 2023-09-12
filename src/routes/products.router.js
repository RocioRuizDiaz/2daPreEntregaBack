const { Router } = require("express");
const { productModel } = require("../models/product.model");

const router = Router();


router.get("/", async (req, res) => {
    try {
        let products = await productModel.find();
        res.send({ result: "success", payload: products });
    } catch (error) {
        console.error(error);
        res.status(404).send({ status: "error", error: "Falta parametro" });
    }
});

router.post("/products", async (req, res) => {
  let { title, stock, category, price, thumbnail } = req.body;

   if (!title ||!price || !description) {
    res.status(400).send({ status: "error", error: "Parametro incompleto" });
    return;
  } 
    try {
       let result = await productModel.create({ title, stock, category, price, thumbnail });
       res.send({ result: "success", payload: result });

    } catch( error){
        console.log(error)
        res.status(500).send({ status: "error", error: " Falta parametro " });
    }
    

});

router.put("/:pid", async (req, res) => {
    let { productId } = req.params;
    let productToUpdate = req.body;
    
    if (!productToUpdate.title || !productToUpdate.stock || !productToUpdate.price || !productToUpdate.category) {
        res.status(400).send({ status: "error", error: "Parametro incompleto" });
        return;
    }
    try {
        let result = await productModel.findByIdAndUpdate(productId, productToUpdate, {new: true});
        res.status(200).send({ status: "success", payload: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error al actualizar producto" });
    }
});

router.delete("/:productId", async (req, res) => {
    let { productId } = req.params;
    try {
     let result = await productModel.findByIdAndDelete( productId );
     res.send({result: "succes", payload: result})
    } catch(error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Error al actualizar producto" });

    }
});

module.exports = router;
