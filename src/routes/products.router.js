const { Router } = require("express");
const { productsModel } = require("../models/product.model");


const router = Router();


router.get("/", async(req,res) =>{
    try {
        const { sort, category, limit } =req.query
        const query = {};
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

        const products = await productsQuery;
        res.send({result: "sucess", payload: products });
        
    } catch (error){
        res.send({status: error, error: "Error al obtener informacion."});
    }
});

router.post('/', async (req, res) => {
    const { id, title, category,  price, stock, image  } = req.body
    if (!id || !title || !category ||  !price || !stock || !image){
        res.send({status: error, error: "Faltan parámetros"})
    }
    const result = await productsModel.create({
      id,
      title,
      category,
      price,
      stock,
      image
    })
    res.send({ status: 'success', payload: result })
  })

  router.put('/:pid', async (req, res) => {
    let { pid } = req.params
    let productToReplace = req.body

    if ((!id || !title || !category ||  !price || !stock || !image)){
        res.send({ status: error, error: "Faltan parámetros" })
    }
    const result = await productsModel.updateOne({ _id: pid }, productToReplace)
    res.send({ status: 'success', payload: result })
  })
 
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    const result = await productsModel.deleteOne({ _id: pid })
    res.send({ result: "success", payload: result })

});

module.exports = router;
