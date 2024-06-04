import { Schema, model } from "mongoose";

const cartCollection = 'carts'

const cartSchema = new Schema({

    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'titles'
            },
            quantity: Number
        }
        ]
    }
})

cartSchema.pre('find', function () {
    this.populate('products.product')
})



export const cartModel = model(cartCollection, cartSchema)