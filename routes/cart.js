const router = require("express").Router();
const mongoose = require("mongoose")
const Cart = require("../models/Cart.model")
const Product = require("../models/Product.model")
const {isLoggedIn}= require("../middleware/route-guard")


router.post("/addtocart/:id", isLoggedIn , (req, res, next) =>{
    console.log('here')
    const {id} = req.params
    const userId = req.session.user._id
    // let objId = mongoose.Types.ObjectId(id)


    // const cart = await Cart.findOneAndUpdate({ userId: userId })
    // const product = await Product.findById(productId);

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

// router.get("/cart/:id", ((req, res) =>{
   
//     res.render("cart")
// })
// )


// router.get("/de/:id", (req, res) =>{
//      const cartId = req.params.id
     
//     .then(() =>{

//     })
// })

// if (!cart) {
//     const newCart = new cartSchema({
//       user: userId,
//       products: [{
//         productId: product._id,
//         quantity: quantity,
//         price: product.price
//       }]
//     });


//     await newCart.save();
// req.session.cartId = newCart._id;
// } else {
// const itemIndex = cart.products.findIndex(item => products.productId.equals(productId));

// if (itemIndex > -1) {
//   // Update existing item quantity
//   cart.products[itemIndex].quantity += quantity;
// } else {
//   // Add new item to cart
//   cart.products.push({
//     productId: product._id,
//     quantity: quantity,
//     price: product.price
//   });
// }

// await cart.save();
// }

// res.send({ success: true });
// });


module.exports = router