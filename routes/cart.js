const router = require("express").Router();
const Cart = require("../models/Cart.model")
const Product = require("../models/Product.model")
const {isLoggedIn}= require("../middleware/route-guard")





router.get("/cart",isLoggedIn, ((req, res, next) =>{
   let id = req.session.user._id
   Cart.findOne({userId: id})
   .then(cartFromUser=> {
   
    if(cartFromUser != null){
        
        res.render("cart", {cartItems: cartFromUser.products})
        console.log('ID HERE BELOW!!!!!!!!')
        console.log(cartFromUser.products)

    } else {
        res.render("cart", {cartItems:{}})

    }
       
   })
   .catch(err => next(err)) 
})
)



router.post("/addtocart/:id", isLoggedIn , (req, res, next) =>{
    console.log('here')
    const {id} = req.params
    const userId = req.session.user._id
    console.log(id)
    console.log(userId)
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

router.post("/cart/:id", isLoggedIn, ((req, res, next) => {
    console.log("oooooooooooooooooooooooooooooooo")
    let usrId = req.session.user._id
    const { prdId } = req.params
    console.log('cart here product id!!!!')
    console.log(prdId)
    Cart.findOneAndUpdate({ userId: usrId }, {$pull:{productId: prdId}})

            // const prd = cartFromUser.products.productId(prdId)
            // prd.remove()
            // cartFromUser.save()
                .then(updatedCart => {
                    res.redirect("/cart")
                    // console.log(updatedCart)
                })
                .catch(err => next(err))

        })

)



module.exports = router