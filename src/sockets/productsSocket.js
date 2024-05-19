//import ProductManager from "../managers/productManager.js"
import productManagerMongo from "../dao/productManagerMdb.js"
import { __dirname } from "../utils"

const products =new productManagerMongo()


const productsSocket = (io) => {
    io.on('connection', async (socket) => {
        console.log('cliente on')
    


        
    })
}

export default productsSocket