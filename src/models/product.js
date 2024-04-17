"use strict"

const { mongoose } = require('../configs/dbConnection')

//? Product Model:

const ProductSchema = new mongoose.Schema({
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brandId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        default: 0
    }
},{
    collection: 'products',
    timestamps: true
})

module.exports = mongoose.model('Product', ProductSchema)