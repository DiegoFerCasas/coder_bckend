import { Schema, model } from "mongoose";

const ticketCollection = 'ticket'

const ticketSchema = new Schema({

    code:{
        type:String,
        require:true,
        unique:true
    },
    purchase_datetime:{
        type:Date,
        require:true
    },
    amount:{
        type:Number,
        require:true,
    },
    purchaser:{
        type:String,
        require:true
    }

})

export const ticketModel = model(ticketCollection, ticketSchema)