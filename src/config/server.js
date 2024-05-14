import { connect } from "mongoose";

const connectDB = () => {
    connect('mongodb+srv://dfercasas:ISG1dFUdEg5cpOHT@cluster0.yqs1z7n.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0')
    console.log("DB connected")
}

export default connectDB