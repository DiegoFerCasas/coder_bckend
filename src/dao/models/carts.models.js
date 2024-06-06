import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const cartCollection = 'carts'

const cartSchema = new Schema({

    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: "titles"
            },
            quantity: Number
        }
        ]
    }
})

cartSchema.pre('find', function () {
    this.populate({path:'products.product',select:"code"})
})
cartSchema.plugin(mongoosePaginate)

export const cartModel = model(cartCollection, cartSchema)