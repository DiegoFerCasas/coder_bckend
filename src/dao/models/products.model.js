import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'titles'

const productSchema = new Schema({
    title: String,
    description: String,
    code: {
        type:String,
        unique:true
    },
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnail: String
})

productSchema.plugin(mongoosePaginate)

export const productModel = model(productCollection, productSchema)