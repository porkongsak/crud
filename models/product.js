const mongoose = require('mongoose')


const product = new mongoose.Schema({
    product_name: String,
    price: Number,
    amount: Number,
    img: [],
    detail: Object
})

module.exports = mongoose.model('products',product)