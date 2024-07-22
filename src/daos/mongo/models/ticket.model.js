import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const ticketCollection = 'ticket'

const ticketSchema = new Schema({

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
    this.populate({path:'products.product'})
})
cartSchema.plugin(mongoosePaginate)

export const ticketModel = model(cartCollection, ticketSchema)