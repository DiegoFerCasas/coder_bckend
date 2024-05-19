import { Schema, model } from "mongoose";

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
export const productModel = model(productCollection, productSchema)