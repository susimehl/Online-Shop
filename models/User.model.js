const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

   firstname:{
            type:String,
        },
 lastname:{
            type:String,
        },
    address:{
        city:String,
        street:String,
        number:Number,
        zipcode:String,
        geolocation:{
            lat:String,
            long:String
        }
    },
})

module.exports = mongoose.model('user',userSchema)