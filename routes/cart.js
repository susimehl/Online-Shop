const router = require("express").Router();
const Cart = require("../models/Cart.model")
const Product = require("../models/Product.model")
const {isLoggedIn}= require("../middleware/route-guard")





router.get("/cart",isLoggedIn, ((req, res) =>{
   let id = req.session.user._id
   Cart.findOne({userId: id})
   .then(cartFromUser=> {
       res.render("cart", {cartItems: cartFromUser.products})
   })
})
)



router.post("/addtocart/:id", isLoggedIn , (req, res, next) =>{
    console.log('here')
    const {id} = req.params
    const userId = req.session.user._id

    Product.findById(id)
    .then((product)=> {
        Cart.findOneAndUpdate({ userId: userId }, {$push:{ products: {productId: id, quantity: 1, price:product.price }}},{new:true})
        .then((newCart) =>{
            console.log(newCart)
            // Product.findById(productId)
            res.redirect(`/detail/${id}`)
            })
        .catch(err => next(err)) 
    })
})





module.exports = router