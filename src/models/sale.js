"use strict"

const { mongoose } = require('../configs/dbConnection')

//? Sale model:

const SaleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    brandId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        default:1
    },
    total: {
        type:Number,
        default:function(){return this.price * this.amount}, // if value did not sent
        transform:function(){return this.price * this.amount}, // if value updated
        set:function(){return this.price * this.amount} // if value sent
    }
},{
    timestamps: true,
    collection: 'Sales'
})

//? exports:

module.exports = mongoose.model('Sale', SaleSchema)