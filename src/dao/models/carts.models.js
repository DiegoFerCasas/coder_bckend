import { Schema, model } from "mongoose";

const cartCollection = 'carts'

const cartSchema = new Schema({

    products: [
        {
            pid: Number,
            quantity: Number
        }

    ]

})
export const cartModel = model(cartCollection, cartSchema)