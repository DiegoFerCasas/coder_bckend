import ProductManager from "../managers/productManager.js"
import { __dirname } from "../utils"

const products =new ProductManager()


const productsSocket = (io) => {
    io.on('connection', async (socket) => {
        console.log('cliente on')
    


        
    })
}

export default productsSocket