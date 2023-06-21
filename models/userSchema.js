//import mongoose
const mongoose=require('mongoose')

//create a schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cart: {
        type: Array,
        messager: [
            {
                id: {
                    type: Number,
                    required: true
                },
                cartId: {
                    type: Number,
                    required: true,
                    unique: true
                },
                name: {
                    type: String,
                    required: true,
                    unique: true
                },
                color: {
                    type: String,
                    required: true
                },
                material: {
                    type: String,
                    required: true
                },
                length: {
                    type: Number
                },
                breadth: {
                    type: Number
                },
                finish: {
                    type: String,
                    required: true
                },
                availability: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                offer: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    default:1
                },
                image1: {
                    type: String,
                    required: true
                },
                image2: {
                    type: String,
                    required: true
                },
                total: {
                    type:Number,
                    default:0
                }
            }
        ]
    },
    wishlist: {
        type: Array,
        message: [{
            id: {
                type: Number,
                required: true,
                unique:true
            },
            name: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required: true
            },
            material: {
                type: String,
                required: true
            },
            thickness: {
                type: Number,
                required: true
            },
            length: {
                type: Number,
                required: true
            },
            breadth: {
                type: Number,
                required: true
            },
            finish: {
                type: String,
                required: true
            },
            availability: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            offer: {
                type: Number,
                required: true
            },
            image1: {
                type: String,
                required: true
            },
            image2: {
                type: String,
                required: true
            },
            quantity: {
                type:Number,
                default:1
            },
            backimage: {
                type: String,
                required: true
            },
            measurement: {
                type: Number
            }
        }]
    },
    amount:{
        type: Number,
        default:0
    },
    usertype:{
        type:String,
        default:'user'
    }
})


//create model
const user=mongoose.model('user',userSchema)

//export
module.exports=user