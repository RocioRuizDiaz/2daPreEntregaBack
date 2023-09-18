const { Router } = require("express");
const { productsModel } = require("../models/products.model");


const router = Router();


router.get("/", async(req,res) =>{
    try {
        const { sort, category, limit } =req.query
        if(category){
            query.category = category;
        }
        let productsQuery = productsModel.find(query);
        if (sort) {
            productsQuery = productsQuery.sort(sort);
        }

        if (limit) {
            productsQuery = productsQuery.limit(parseInt(limit));
        }

        const products = await productsQuery.exec();
        res.send({result: "sucess", payload: products });
        
    } catch (error){
        res.send({status: error, error: "Error al obtener informacion."});
    }
});
router.post("/", async (req, res) => {
    let {  id, title, stock, category, price, thumbnail } = req.body;
    if (!id || !title || !stock || !category || !price || !thumbnail) {
    res.send({ status: "error", error: "Falta parametro"});
   
    
    }

    let result = await productsModel.create({title, stock, category, price, thumbnail })
    res.send({result: "succes", payload: result });
    
})
router.put("/:pid", async (req, res) => {
    let { pid } = req.params;

    let productToReplace = req.body; 
     if (!id || !title || !stock || !category || !price || !thumbnail){
        res.send({ status: "error", error: "Falta parametro"});
    }
     let result = await productsModel.updateOne({ _id: pid}, productToReplace);
     res.send({result: "succes", payload: result })
});
router.delete("/:pid", async (req, res) => {
    let pid= req.params
    let result = await productsModel.deleteOne({ _id: pid })
    res.send({ result: "success", payload: result })

});

module.exports = router;
