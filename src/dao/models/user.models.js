import { Schema, model } from "mongoose";

const userCollection = 'users'

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: String,
    email: {
        type: String,
        require: true,
        unique: true,
    },
    age: Number,
    password: String,
    cart_id: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        default: 'user'
    }
})
//ODM === object document model
export const userModel = model(userCollection, userSchema)