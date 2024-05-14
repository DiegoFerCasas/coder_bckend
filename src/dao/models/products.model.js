import { Schema, model } from mongoose;

const productCollection = 'titles'

const productSchema = new Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnail: String
})
export const productModel = model(productCollection, productSchema)