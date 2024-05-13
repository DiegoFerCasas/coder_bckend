// import mongoose from "mongoose";

// const userCollection = 'usuarios'

// const userSchema = new mongoose.Schema({

// }) ES LO MISMO QUE --> CON DESTRUCTURING

import { Schema, model } from "mongoose";

const userCollection = 'users'

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        require: true,
        unique: true,
    }
})
//ODM === object document model
export const userModel = model(userCollection, userSchema)