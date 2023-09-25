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

        const products = await productsQuery.exec();
        res.send({result: "sucess", payload: products });
        
    } catch (error){
        res.send({status: error, error: "Error al obtener informacion."});
    }
});

router.post('/', async (req, res) => {
    const { title, category,  price, stock, image  } = req.body
  
    const result = await productsModel.create({
      title,
      category,
      price,
      stock,
      image
    })
    res.send({ status: 'success', payload: result })
  })
  router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const { stock } = req.body
    if (stock < 0) return res.send({ status: 'error', error: 'Incomplete values' })
    const result = await productsModel.updateOne({ _id: pid }, { stock })
    res.send({ status: 'success', payload: result })
  })
 
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    const result = await productsModel.deleteOne({ _id: pid })
    res.send({ result: "success", payload: result })

});

module.exports = router;
