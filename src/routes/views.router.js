import { Router } from "express";
import ProductManager from "../managers/productManager.js"

const viewRouter = Router()
const products = new ProductManager()

viewRouter.get('/', async (req, res) => {
    const productList = await products.getProducts()
    res.render('home', { productList })
})

viewRouter.get('/chat', (req, res) => {
    res.render('chat', {})

})

viewRouter.get('/realtimeproducts', (req,res)=>{
    res.render('realTimeProducts')
})

export default viewRouter