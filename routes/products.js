const router = require("express").Router();
const Product = require("../models/Product.model")
const User = require("../models/User.model")

router.get("/", (req, res, next) => {
    let user = req.session.user 
    Product.find()
    .then((productsDB) =>{
        res.render("index", { products : productsDB, user: user })
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