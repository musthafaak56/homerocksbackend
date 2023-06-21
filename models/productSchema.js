//import mongoose
const mongoose = require('mongoose')

//define schema
const productsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
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
})



//create a model to store data
const productslist = new mongoose.model('productslist', productsSchema)

//export the productslist schema
module.exports = productslist

