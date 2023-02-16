const router = require("express").Router();
const Product = require("../models/Product.model")

router.get("/", (req, res, next) => {

    Product.find()
    .then((productsDB) =>{
        console.log(productsDB)
        res.render("index", { products : productsDB })
    }).catch((err) => next(err))
})

router.get("/detail/:id", (req, res) => {
    const productId = req.params.id
    Product.findById(productId)
    .then(productFromDB => {
        console.log(productFromDB)
        res.render("detail", { product : productFromDB })
    })
    .catch(err => next(err))
})

module.exports = router