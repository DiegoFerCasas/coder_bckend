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
    }
})
//ODM === object document model
export const userModel = model(userCollection, userSchema)