const mongoose = require('mongoose')
const moment = require('moment/min/moment-with-locales')


const product = new mongoose.Schema({
    product_name: String,
    price: String,
    amount:String,
    //joined: { type: Date, default: () => moment().locale('th').format('YYYY-MM-DD HH:mm:ss') } //{moment().locale('th').startOf('hour').fromNow()
},
{ timestamps: true }
)

module.exports = mongoose.model('products',product)