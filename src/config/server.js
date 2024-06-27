import { connect } from "mongoose";
import dotenv from 'dotenv'
import { program } from "../utils/commander.js";

const { mode } = program.opts()

dotenv.config({
    path: mode === 'production' ? './.env.production' : './.env.development'
})


export const objectConfig = {
    port: process.env.PORT || 8081,
    mongo_url: process.env.MONGO_URL,
}


export const connectDB = async () => {
    connect(process.env.MONGO_URL)
    console.log("DB connected")
}

