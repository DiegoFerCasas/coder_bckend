import { Schema, model } from "mongoose";

const cartCollection = 'users'

const cartSchema = new Schema({

    products: [
        {
            pid: Number,
            quantity: Number
        }

    ]

})
export const cartModel = model(cartCollection, cartSchema)